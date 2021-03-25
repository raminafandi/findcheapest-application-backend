import csv
import requests
import json


with open('foods.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    headers = {'content-type': 'application/json'}
    find_rest = 'http://127.0.0.1:5000/api/restaurants/find/?title='
    url = "http://127.0.0.1:5000/api/products/"

    for row in csv_reader:
        # ,rest,food_type,name,desc,price,img
        restaurant = row[1]
        name = row[3]
        image = row[6]
        price = row[5]
        id = requests.get(find_rest+restaurant, headers).json()


        price = str(price[:4].replace(",","."))
        myobj = {
            "name": name,
            "description": "",
            "price": float(price),
            "img": image,
            "_restaurant": id['id']
        }

        x = requests.post(url, data = json.dumps(myobj),headers=headers)
        print(x.status_code)
