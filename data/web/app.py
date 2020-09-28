from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import psycopg2


app = Flask(__name__)
CORS(app)
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
    cur.execute("SELECT json_agg(t) FROM (SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary AS cl JOIN score AS s ON cl.postal_code = s.postal_code JOIN coordinates AS coord ON s.postal_code = coord.postal_codes)t")

    #cur.execute("SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary_df AS cl JOIN score_df AS s ON cl.postal_code = s.postal_code JOIN coordinates_df AS coord ON s.postal_code = coord.postal_codes")

    calgary_data = cur.fetchall()
    # print(calgary_data)

    # close cursor
    #cur.close()

    # close the connection
    #con.close()

    return calgary_data


@app.route("/post")
def post_group():

    # create cursor
    cur2 = con.cursor()

    # execute query
    cur2.execute("SELECT * FROM post_group")
    
    group_data = cur2.fetchall()
    # print(calgary_data)

    # Return template and data
    return render_template("index2.html", group=[i for i in group_data])


@app.route("/post_json")
def post_json():
    # create cursor
    cur2 = con.cursor()

    # execute query
    cur2.execute("SELECT json_agg(t) FROM (SELECT * FROM post_group)t")

    group_data = cur2.fetchall()
    # print(calgary_data)

    # Return template and data
    return group_data

@app.route("/")
def home():
    # create cursor
    cur = con.cursor()

    # execute query
    #cur.execute("SELECT json_agg(t) FROM (SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary_df AS cl JOIN score_df AS s ON cl.postal_code = s.postal_code JOIN coordinates_df AS coord ON s.postal_code = coord.postal_codes)t")

    cur.execute("SELECT cl.price, cl.address, cl.postal_code, cl.bed, cl.full_bath, cl.half_bath, cl.property_area, cl.property_type, s.walk_score, s.bike_score, s.transit_score, coord.lat, coord.long FROM calgary AS cl JOIN score AS s ON cl.postal_code = s.postal_code JOIN coordinates AS coord ON s.postal_code = coord.postal_codes")

    calgary_data = cur.fetchall()
    # print(calgary_data)

    # close cursor
    # cur.close()

    # close the connection
    # con.close()

    # Return template and data
    return render_template("index.html", calgary=[i for i in calgary_data])

@app.route("/jsonified")
def calgary_data():
    """Return the Calgary data as json"""
    calgary = calgary_data_fun()
    # calgary = calgary[:15]
    return jsonify(calgary)


@app.route("/post2")
def post_data():
    """Return the post data as json"""
    post = post_json()

    return jsonify(post)

@app.route("/viz")
def viz():
    return render_template("viz.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")

if __name__ == "__main__":
    app.run(debug=True)

