from flask import Flask, request, jsonify
import yfinance as yf
from pandas import *
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
 
 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'stockdata'
 
mysql = MySQL(app)


@app.route("/quote")
def display_quote():
	symbol = request.args.get('symbol', default="AAPL")

	quote = yf.Ticker(symbol)
	return jsonify(quote.info)

@app.route("/history")
def display_history():
	symbol = request.args.get('symbol', default="AAPL")
	period = request.args.get('period', default="1y")
	interval = request.args.get('interval', default="1h")

	quote = yf.Ticker(symbol)	
	hist = quote.history(period=period, interval=interval)
	data = hist.to_json()
	return data


if __name__ == "__main__":
	app.run(host="localhost", port=8000, debug=True)

