import csv
import requests
import json
from bson import ObjectId


class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return obj

with open('food.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    headers = {'content-type': 'application/json'}
    find_rest = 'http://127.0.0.1:5000/api/restaurants/find/?title='
    url = "http://127.0.0.1:5000/api/products/"

    for row in csv_reader:
        name = row[1]
        image = row[2]
        price = row[3]
        restaurant = row[4]
        id = requests.get(find_rest+restaurant, headers).json()
        
        myobj = {
            "name": name,
            "description": "",
            "price": price[:5],
            "img": image,
            "_restaurant": id['id']
        }

        x = requests.post(url, data = json.dumps(myobj,cls=Encoder),headers=headers)
        print(x.status_code)