from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import psycopg2


app = Flask(__name__)
# mongo = PyMongo(app, uri="mongodb://localhost:27017/realestate_db")


db = SQLAlchemy()


# connect to the db
con = psycopg2.connect(
            host="localhost",
            database="realestate_db",
            user="postgres",
            password="123"
)

def calgary_data_fun():
    cur = con.cursor()

    # execute query
    cur.execute("SELECT json_agg(t) FROM (SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary_df AS cl JOIN score_df AS s ON cl.postal_code = s.postal_code JOIN coordinates_df AS coord ON s.postal_code = coord.postal_codes WHERE cl.price < 1000000)t")

    #cur.execute("SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary_df AS cl JOIN score_df AS s ON cl.postal_code = s.postal_code JOIN coordinates_df AS coord ON s.postal_code = coord.postal_codes")

    calgary_data = cur.fetchall()
    # print(calgary_data)

    # close cursor
    #cur.close()

    # close the connection
    #con.close()

    return calgary_data

@app.route("/")
def home():

    # create cursor
    cur = con.cursor()

    # execute query
    cur.execute("SELECT json_agg(t) FROM (SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary_df AS cl JOIN score_df AS s ON cl.postal_code = s.postal_code JOIN coordinates_df AS coord ON s.postal_code = coord.postal_codes WHERE cl.price < 1000000)t")

    #cur.execute("SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary_df AS cl JOIN score_df AS s ON cl.postal_code = s.postal_code JOIN coordinates_df AS coord ON s.postal_code = coord.postal_codes")
    
    calgary_data = cur.fetchall()
    # print(calgary_data)

    # close cursor
    #cur.close()

    # close the connection
    #con.close()

    # Return template and data
    return render_template("index.html", calgary=[i for i in calgary_data])



@app.route("/jsonified")
def calgary_data():
    """Return the Calgary data as json"""
    calgary = calgary_data_fun()
    # calgary = calgary[:15]
    return jsonify(calgary)

@app.route("/viz")
def viz():
    return render_template("viz.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

@app.route("/treemap")
def treemap():
    return render_template("treemap.html")

if __name__ == "__main__":
    app.run(debug=True)

