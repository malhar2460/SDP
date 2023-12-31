import cv2
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import os
import mysql.connector
from PIL import Image
from .models import *
from .serializer import *
import base64
from django.core.files.base import ContentFile
from io import BytesIO

import cv2
import threading
from django.http import StreamingHttpResponse
from cvzone.HandTrackingModule import HandDetector
from cvzone.ClassificationModule import Classifier
import numpy as np
import math
import logging
import os
import sys
from django.shortcuts import render
from django.http import HttpResponse, StreamingHttpResponse

from django.views.decorators.csrf import csrf_protect

# Disable OpenCV logging
cv2.setLogLevel(logging.ERROR)

# logging.getLogger("requests").setLevel(logging.WARNING)
urllib3_logger = logging.getLogger('urllib3')
urllib3_logger.setLevel(logging.CRITICAL)

# Redirect stderr to null device
sys.stderr = open(os.devnull, 'w')

# # # Assuming you have the 'model.h5' and 'labels.txt' files in the same directory as this code
classifier = Classifier('model.h5', 'labels.txt')
# label = ['A', 'B', 'C','D','E']
detector = HandDetector(detectionCon=0.8, maxHands=2)

# Assuming you have defined the HandDetector and Classifier classes appropriately

# label = ['A', 'B', 'C', 'D', 'E']  # Replace with your own labels
# o P Q R S T 
label = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

# guest_id = None

# @api_view(['GET'])
# def guest(request):
#     global guest_id

#     if guest_id is None:
#         cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
#                                        host='127.0.0.1', port='3306',
#                                        database='sdp')
#         cursor = cnn.cursor()

#         cursor.execute("INSERT INTO `guest` () VALUES();")
#         cnn.commit()

#         cursor.execute("SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1;")
#         guest_id = cursor.fetchone()[0]

#     return Response({'guest_id': guest_id})

@api_view(['POST'])
def dash(request):
    user = request.data.get('user')
    option = request.data.get('option')
    timee = request.data.get('time')
    print(user,option,timee)
    # if user=='Guest' and option == 'sign' and option == 'Today':
    #     connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
    #                                    host='127.0.0.1', port='3306',
    #                                    database='sdp')
    #     # Create a cursor object to execute queries
    #     cursor = connection.cursor()

    #     # Execute the query to fetch the last guest ID
    #     query = 'SELECT * FROM info;'
    #     cursor.execute(query)

    #     # Fetch the result
    #     result = cursor.fetchall()
    #     # Close the cursor and database connection
    #     cursor.close()
    #     connection.close()
    connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                       host='127.0.0.1', port='3306',
                                       database='sdp')
    # Create a cursor object to execute queries
    cursor = connection.cursor()

    # Execute the query to fetch the last guest ID
    query = "SELECT info_id,guest_id,user_id,duration,DATE_FORMAT(arrival_date, '%d-%m-%Y') AS formatted_arrival_date,TIME_FORMAT(arrival_time, '%H:%i:%s') AS formatted_arrival_time FROM info;;"
    cursor.execute(query)
    # Fetch the result
    result = cursor.fetchall()
    query1 = "SELECT column_name FROM information_schema.columns WHERE table_schema = 'sdp' AND table_name = 'info';"
    cursor.execute(query1)
    headers = cursor.fetchall()
    # Close the cursor and database connection
    cursor.close()
    connection.close()
    return Response({'res':result,'headers':headers})

from datetime import datetime
@api_view(['POST'])
def data(request):
    user_id = request.data.get('user_id')
    guest_id = request.data.get('guest_id')
    duration = request.data.get('duration')
    date = request.data.get('date')
    time = request.data.get('time')
    if user_id != 'notfound':
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        time_obj = datetime.strptime(time, '%I:%M:%S %p')

        # Format the time as 24-hour clock format ('%H:%M:%S')
        formatted_time = time_obj.strftime('%H:%M:%S')
                    # insert into info (duration, arrival_date, arrival_time) VALUES (2,'2023-7-24','12:10:46 AM')
        # cursor.execute("INSERT INTO info (duration, arrival_date, arrival_time) VALUES (%s, '%s', '%s')",(duration,date,time))
        cursor.execute(f"INSERT INTO info (user_id,duration, arrival_date, arrival_time) VALUES ({user_id},{duration}, '{date}', '{formatted_time}')")
        cnn.commit()
    else:
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        time_obj = datetime.strptime(time, '%I:%M:%S %p')

        # Format the time as 24-hour clock format ('%H:%M:%S')
        formatted_time = time_obj.strftime('%H:%M:%S')
                    # insert into info (duration, arrival_date, arrival_time) VALUES (2,'2023-7-24','12:10:46 AM')
        # cursor.execute("INSERT INTO info (duration, arrival_date, arrival_time) VALUES (%s, '%s', '%s')",(duration,date,time))
        cursor.execute(f"INSERT INTO info (guest_id,duration, arrival_date, arrival_time) VALUES ({guest_id},{duration}, '{date}', '{formatted_time}')")
        cnn.commit()
    return Response({"done":"done"})


# @api_view(['GET', 'POST', 'PATCH'])
# def data(request):
#     if request.method == 'GET':
#         # Check if a record exists for the current user and guest
#         user_id = request.GET.get('user_id')
#         guest_id = request.GET.get('guest_id')
        
#         connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
#                                        host='127.0.0.1', port='3306',
#                                        database='sdp')
#         cursor = connection.cursor()
        
#         query = "SELECT * FROM data WHERE user_id = %s AND guest_id = %s;"
#         cursor.execute(query, (user_id, guest_id))
#         result = cursor.fetchall()
        
#         cursor.close()
#         connection.close()
        
#         if result:
#             return JsonResponse({'exists': True})
#         else:
#             return JsonResponse({'exists': False})

#     elif request.method == 'POST':
#         # Create a new record
#         user_id = request.POST.get('user_id')
#         guest_id = request.POST.get('guest_id')
#         duration = request.POST.get('duration')
#         arrival_date = request.POST.get('date')
#         arrival_time = request.POST.get('time')

#         connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
#                                        host='127.0.0.1', port='3306',
#                                        database='sdp')
#         cursor = connection.cursor()
        
#         query = "INSERT INTO data (user_id, guest_id, duration, arrival_date, arrival_time) VALUES (%s, %s, %s, %s, %s);"
#         cursor.execute(query, (user_id, guest_id, duration, arrival_date, arrival_time))
#         connection.commit()
        
#         cursor.close()
#         connection.close()

#         return JsonResponse({'message': 'Record created successfully'})

#     elif request.method == 'PATCH':
#         # Update the duration for an existing record
#         user_id = request.POST.get('user_id')
#         guest_id = request.POST.get('guest_id')
#         duration = request.POST.get('duration')

#         connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
#                                        host='127.0.0.1', port='3306',
#                                        database='sdp')
#         cursor = connection.cursor()
        
#         query = "UPDATE data SET duration = %s WHERE user_id = %s AND guest_id = %s;"
#         cursor.execute(query, (duration, user_id, guest_id))
#         connection.commit()
        
#         cursor.close()
#         connection.close()

#         return JsonResponse({'message': 'Record updated successfully'})

@api_view(['GET'])
def get_last_guest_id(request):
    # Connect to the MySQL database
    connection = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                       host='127.0.0.1', port='3306',
                                       database='sdp')
    # Create a cursor object to execute queries
    cursor = connection.cursor()

    # Execute the query to fetch the last guest ID
    query = 'SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1;'
    cursor.execute(query)

    # Fetch the result
    result = cursor.fetchone()

    # Close the cursor and database connection
    cursor.close()
    connection.close()

    # Return the last guest ID as JSON response
    last_guest_id = result[0] if result else 0  # Return 0 if no guest ID found
    return Response({'lastGuestId': last_guest_id})


@api_view(['POST'])
def guest(request):
    guest_id = request.data.get('guest_id')
    print(guest_id)
    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                       host='127.0.0.1', port='3306',
                                       database='sdp')
    cursor = cnn.cursor()

    cursor.execute(f"INSERT INTO `guest` () VALUES({guest_id});")
    cnn.commit()

    cursor.execute("SELECT guest_id FROM guest ORDER BY guest_id DESC LIMIT 1;")
    guest_id = cursor.fetchone()[0]


    return Response({'guest_id': guest_id})


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        passwd = request.data.get('passwd')
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                host='127.0.0.1',port='3306',
                                    database='sdp')
        cursor = cnn.cursor()
        insert = "select username,passwd from user where username='%s' AND passwd='%s'"
        data = (username,passwd)
        cursor.execute(f"select user_id from user where username='{username}' AND passwd='{passwd}'")
        results = cursor.fetchall()
        cnn.close()
        if len(results) == 0 :
            auth = 'False'
            return Response({'auth':auth})
        else:
            auth = 'True'
            return Response({'auth':auth,'id':results})



@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        passwd = request.data.get('passwd')
        email = request.data.get('email')
        print(username,passwd,email)
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                host='127.0.0.1',port='3306',
                                    database='sdp')
        cursor = cnn.cursor()
        insert = "INSERT INTO `User` (username, passwd, email) VALUES('%s','%s','%s');"
        data = (username,passwd,email)
        # INSERT INTO `User` (username, passwd, email) VALUES('admin','admin','admin@gmail.com')
        cursor.execute(f"select username,passwd from user where username='{username}' AND passwd='{passwd}'")
        results = cursor.fetchall()
        if len(results) == 0 :
            auth = 'True'
            cursor.execute(f"INSERT INTO `User` (username, passwd, email) VALUES('{username}','{passwd}','{email}')")
            cnn.commit()
            state = 'pass'
            cnn.close()
            cursor.close()
        else:
            state = 'False'
            auth = 'False'
   
    return Response({'state':state,'auth':auth})

@api_view(['POST'])
def contact(request):
    fname = request.data.get('fname')
    lname = request.data.get('lname')
    email = request.data.get('email')
    phone = request.data.get('phone')
    msg = request.data.get('msg')
    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
    cursor = cnn.cursor()
    current_time = str(datetime.now().strftime('%Y-%m-%d'))
    cursor.execute("INSERT INTO contact VALUES (%s,%s,%s,%s,%s,%s)", (fname,lname,email,phone,msg,current_time))
    cnn.commit()
    return Response({'res':'The message was sent successfully'})

@api_view(['POST'])
def speech(request):
    return Response({'response':'Got the message'})

@api_view(['GET'])
def user(request):
    # users = User.objects.values_list("user_id",flat=False).get(user_id=1)
    # users = User.objects.all()
    # print(users)
    # serializer = UserSerializer(users, many=False)
    # serialized_data = serializer.data

    # # print(serialized_data['user_id'])
    # return JsonResponse(serialized_data['user_id'], safe=False)
    try:
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        cursor.execute("select sign from sign_to_text where user_id=1 order by img_id DESC limit 1")
        results = cursor.fetchone()[0]
        cnn.close()
        # print(results)
        user_id = User(user_id=1)
        img_id = Sign_to_text(img_id = 1)
        img = Sign_to_text(img_id=1,user_id = user_id,sign=results)
        serializer = SignSerializer(img)
        # print(serializer.data)
        return Response(serializer.data)
    except Sign_to_text.DoesNotExist:
        return Response(status=404)

def write_file(data,file):
    with open(file,'wb') as f:
        f.write(data)

@api_view(['POST'])
def process_text(request):
    if request.method == 'POST':
        text = request.data.get('text')
        user_id = request.data.get('user_id')
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        cursor = cnn.cursor()
        # img = int.from_bytes(img,byteorder='big')
        current_time = str(datetime.now().strftime('%Y-%m-%d'))
        insert = "Insert into text_to_sign(user_id,text,translation_date) values(%s,%s,%s)"
        cursor.execute(insert,(user_id,text,current_time))
        cnn.commit()
        cnn.close()
        return Response({'message':'done'})
    return Response({'message':'not done'})


from datetime import datetime
@api_view(['POST'])
def process_video(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    serialized_data = serializer.data
    user = serialized_data

    flag = False
    if request.method == 'POST':
        print ("Inside the post if")
        flag = True
        image_data = request.data.get('image_data')
        user_id = None
        cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                  host='127.0.0.1',port='3306',
                                  database='sdp')
        # guest_id = None
        if not request.data.get('guest_id') and request.data.get('user_id') != "G" and request.data.get('user_id') != "None" and request.data.get('user_id') != "n":
          user_id = request.data.get('user_id')
          print("USER_ID ",str(user_id))
        else:
            guest_id = request.data.get('guest_id')
            guest_id = 0
            print("GUEST_ID ",str(guest_id))
        id = 1
        if image_data:
            # Decode the base64 image data
            image_data = base64.b64decode(image_data.split(',')[1])
            content_file = ContentFile(image_data)
            # Assign the ContentFile object to the sign field
            # user = User.objects.values_list('user_id',flat=True).get(user_id=1)
            # users = User.objects.get(user_id=1)
            # serializer = UserSerializer(users, many=False)
            # serialized_data = serializer.data
            # user = serialized_data

            
            # sign = Sign_to_text(sign=content_file)
            # sign.save()

            # Save the image file locally
            image_path = os.path.join('D:/Desktop/Python/facerecognition/image1.png')
            with open(image_path, 'wb') as f:
                f.write(image_data)

            with open(image_path, 'rb') as f:
                img = f.read()
                img1 = f.read()
            
            # elif guest_id != None:
            #     print(guest_id)
            #     cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
            #                       host='127.0.0.1',port='3306',
            #                       database='sdp')
            #     cursor = cnn.cursor()
            #     cursor.execute("INSERT INTO sign_to_text (sign) VALUES (%s)", (img,))
            #     cnn.commit()
            #     cursor.execute("select img_id from sign_to_text order by img_id desc limit 1")
            #     result = cursor.fetchone()[0]
            #     print("The img_id for guest ",result)
            #     insert = "insert into sign_to_text_guest(img_id,guest_id,sign) values(%s,%s,%s)"
            #     data = (result,guest_id,img)
            #     cursor.execute(insert,data)
            # img = int.from_bytes(img,byteorder='big')
            # if isinstance(user_id,int):
            #     insert = "Insert into sign_to_text_user(user_id,sign) values(%s,%s)"
            #     cursor.execute(insert,(user_id,img))
            # else:
            #     # insert into sign_to_text(sign) values (load_file('D:/Desktop/Python/facerecognition/enhanced_image.png'));
            #     insert = "insert into sign_to_text(img_id,sign) values (%s,%s)"
            #     data = (None,img)
            #     cursor.execute(insert,data)
            #     # cursor.execute(f"insert into sign_to_text(sign) values ({img})")
            #     cnn.commit()
            #     # select img_id from sign_to_text order by img_id desc limit 1;
            #     cursor.execute("select img_id from sign_to_text order by img_id desc limit 1;")
            #     img_id = cursor.fetchone()[0]
            #     cursor.execute("select guest_id from guest order by guest_id desc limit 1;")
            #     guest_id = cursor.fetchone()[0]
            #     print(guest_id)
            #     insert = "Insert into Sign_to_text_guest(img_id,guest_id,sign) values(%s,%s,%s)"
            #     cursor.execute(insert,(img_id,guest_id,img))
            cnn.commit()
            cnn.close()
            # abc = Sign_to_text.objects.all()
            # print(abc)
            # # print(image['sign'])
            # image = base64.b64decode(str(image['sign']).split(',')[1])
            
            
            # Create a video capture object from the image file
            img = cv2.imread(image_path)

            if img is None:
                return Response({'error': 'Failed to read image file'})
            
            # Initialize hand detector and classifier
            detector = HandDetector(maxHands=2)
            # model_path = 'D:/Desktop/Python/facerecognition/model.h5'
            # classifier = Classifier(model_path,'D:/Desktop/Python/facerecognition/labels.txt')
            classifier = Classifier('model.h5','D:/Desktop/Python/facerecognition/labels.txt')
            label = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
            result = []

            # Convert the frame to RGB
            value = 0
            # Detect hands in the frame

            #  '0
            # print(hands,hands_front)
            # while len(hands) != hands_front:
            #     hands, _ = detector.findHands(frame_rgb)
            #     print(len(hands))
            # print(hands,hands_front)
            # count = 0
            # while True:
            #     hands, _ = detector.findHands(frame_rgb)
            #     # print(len(hands),hands_front)
            #     if count > 100:
            #         break
            #     if hands == hands_front:
            #         break
            #     count +=1
            #     print(count)
            lab_image = cv2.cvtColor(img,cv2.COLOR_BGR2LAB)

            l_channel, a_channel, b_channel = cv2.split(lab_image)

            clahe = cv2.createCLAHE(clipLimit=4.0,tileGridSize=(8,8))
            enhanced_l_channel = clahe.apply(l_channel)

            enhanced_lab_image = cv2.merge((enhanced_l_channel,a_channel,b_channel))
            img = cv2.cvtColor(enhanced_lab_image,cv2.COLOR_LAB2BGR)
            cv2.imwrite('D:/Desktop/Python/facerecognition/image2.png',img)
            # frame_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            hands, _ = detector.findHands(img)
            # cv2.imwrite('D:/Desktop/Python/facerecognition/frame_rgb.png',frame_rgb)
            if hands:
            # Create a blank white image
                
                cv2.imwrite('D:/Desktop/Python/facerecognition/image3.png',img)

                blank_image = np.ones_like(img) * 255

                if len(hands) == 1:
                    # Get the hand landmarks
                    hand = hands[0]
                    landmarks = hand['lmList']
                    xo, yo, wo, ho = hand['bbox']
                    if len(landmarks) >= 21:
                        # Draw the hand landmarks on the blank image
                        for landmark in landmarks:
                            x, y = landmark[:2]
                            cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

                        # Connect the hand landmarks with lines
                        connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
                                    [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
                                    [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
                        for connection in connections:
                            start_point = landmarks[connection[0]][:2]
                            end_point = landmarks[connection[1]][:2]
                            cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
                    crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image4.png',blank_image)
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image5.png',crop)

                    prediction,index = classifier.getPrediction(crop)
                    print(prediction)
                    print(label[index])
                    result = label[index]
                    if user_id != None and user_id != "None" and user_id != "G" and request.data.get('user_id') != "n":
                        pass
                    else:
                        user_id = 0
                    print("USer_id from process video",user_id)
                    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                        host='127.0.0.1',port='3306',
                                        database='sdp')
                    cursor = cnn.cursor()
                    # cursor.execute("INSERT INTO sign_to_text (sign) VALUES (%s)", (img,))
                    # cnn.commit()
                    # cursor.execute("select img_id from sign_to_text order by img_id desc limit 1")
                    # result = cursor.fetchone()[0]
                    # print("The img_id for guest ",result)

                    current_time = str(datetime.now().strftime('%Y-%m-%d'))
                    cursor.execute("insert into sign_to_text (user_id,letter,correct_letter,translation_date,sign) values(%s,%s,%s,%s,%s)"
                    ,(user_id,result,result,current_time,image_data))
                    # cursor.execute(f"insert into sign_to_text (user_id,letter,correct_letter,translation_date,sign) values({user_id},'{result}'','{result}','{current_time}',{image_data},)")
                    cnn.commit()
                    return Response({'result': result,'user':user})
                elif len(hands) == 2:
                    x1, y1, w1, h1 = hands[0]['bbox']
                    x2, y2, w2, h2 = hands[1]['bbox']
                    xo = min(x1, x2)
                    yo = min(y1, y2)
                    wo = max(x1 + w1, x2 + w2) - xo
                    ho = max(y1 + h1, y2 + h2) - yo
                    # Crop the combined hand region
                    for hand in hands:
                        # Get the hand landmarks
                        landmarks = hand['lmList']

                        if len(landmarks) >= 21:
                            # Draw the hand landmarks on the blank image
                            for landmark in landmarks:
                                x, y = landmark[:2]
                                cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

                            # Connect the hand landmarks with lines
                            connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
                                        [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
                                        [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
                            for connection in connections:
                                start_point = landmarks[connection[0]][:2]
                                end_point = landmarks[connection[1]][:2]
                                cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
                    crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image4.png',blank_image)
                    cv2.imwrite('D:/Desktop/Python/facerecognition/image5.png',crop)
                    prediction, index = classifier.getPrediction(crop)
                    print(prediction)
                    print(label[index])
                    result = label[index]
                    if user_id != None and user_id != "None" and user_id != "G" and request.data.get('user_id') != "n":
                        pass
                    else:
                        user_id = 0
                    print("USer_id from process video",user_id)
                    cnn = mysql.connector.connect(user='root', password='m@a#s$c_M1',
                                        host='127.0.0.1',port='3306',
                                        database='sdp')
                    cursor = cnn.cursor()
                    # cursor.execute("INSERT INTO sign_to_text (sign) VALUES (%s)", (img,))
                    # cnn.commit()
                    # cursor.execute("select img_id from sign_to_text order by img_id desc limit 1")
                    # result = cursor.fetchone()[0]
                    # print("The img_id for guest ",result)
                    current_time = str(datetime.now().strftime('%Y-%m-%d'))
                    cursor.execute("insert into sign_to_text (user_id,letter,correct_letter,translation_date,sign) values(%s,%s,%s,%s,%s)"
                    ,(user_id,result,result,current_time,image_data))
                    # cursor.execute(f"insert into sign_to_text (user_id,letter,correct_letter,translation_date,sign) values({user_id},'{result}'','{result}','{current_time}',{img1},)")
                    cnn.commit()
                    return Response({'result': result,'user':user})
            else:
                result.append(' ')


            # Delete the temporary image file
            os.remove(image_path)

            return Response({'result': result,'user':user})
        return Response(image_data)
    else:
        return Response({'error': flag})





# # Disable OpenCV logging
# cv2.setLogLevel(logging.ERROR)

# logging.getLogger("requests").setLevel(logging.WARNING)
# urllib3_logger = logging.getLogger('urllib3')
# urllib3_logger.setLevel(logging.CRITICAL)

# # Redirect stderr to null device
# sys.stderr = open(os.devnull, 'w')

# # # # Assuming you have the 'model.h5' and 'labels.txt' files in the same directory as this code
# classifier = Classifier('model.h5', 'labels.txt')
# label = ['A', 'B', 'C','D','E']
# detector = HandDetector(detectionCon=0.75, maxHands=2)

# # # class VideoCamera(object):
# # #     def __init__(self):
# # #         self.video = cv2.VideoCapture(0)
# # #         (self.grabbed, self.frame) = self.video.read()
# # #         threading.Thread(target=self.update, args=()).start()

# # #     def __del__(self):
# # #         self.video.release()

# # #     def get_frame(self):
# # #         imgoutput = self.frame.copy()
# # #         hands, img = detector.findHands(self.frame)
        
# # #         if hands:
# # #             if len(hands) == 2:
# # #                 x1, y1, w1, h1 = hands[0]['bbox']
# # #                 x2, y2, w2, h2 = hands[1]['bbox']
# # #                 x = min(x1, x2)
# # #                 y = min(y1, y2)
# # #                 w = max(x1 + w1, x2 + w2) - x
# # #                 h = max(y1 + h1, y2 + h2) - y

# # #                 crop = img[y - 20:y + h + 20, x - 20:x + w + 20]
# # #                 imgwhite = np.ones((300, 300, 3), np.uint8) * 255
# # #                 ratio = h / w

# # #                 if ratio > 1:
# # #                     k = 300 / h
# # #                     wcal = math.ceil(k * w)
# # #                     imgresize = cv2.resize(crop, (wcal, 300))
# # #                     wgap = math.ceil((300 - wcal) / 2)
# # #                     imgwhite[:, wgap:wcal + wgap] = imgresize
# # #                     prediction, index = classifier.getPrediction(imgwhite)
                    
# # #                 else:
# # #                     k = 300 / w
# # #                     hcal = math.ceil(k * h)
# # #                     himgresize = cv2.resize(crop, (300, hcal))
# # #                     hgap = math.ceil((300 - hcal) / 2)
# # #                     imgwhite[hgap:hcal + hgap, :] = himgresize
# #                 #     prediction, index = classifier.getPrediction(imgwhite)
# #                 # print(label[index])
# #                 # cv2.putText(imgoutput, label[index], (x, y - 20), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 255, 0), 2)
# #                 # cv2.rectangle(imgoutput, (x - 20, y - 20), (x + w + 20, y + h + 20), (0, 255, 0), 4)
# # #             elif len(hands) == 1:
# # #                 hand = hands[0]
# # #                 x, y, w, h = hand['bbox']
# # #                 imgwhite = np.ones((300, 300, 3), np.uint8) * 255
# # #                 crop = img[y - 20:y + h + 20, x - 20:x + w + 20]
# # #                 imgcropshape = crop.shape
# # #                 ratio = h / w
# # #                 if ratio > 1:
# # #                     k = 300 / h
# # #                     wcal = math.ceil(k * w)
# # #                     imgresize = cv2.resize(crop, (wcal, 300))
# # #                     imgresizeshape = imgresize.shape
# # #                     wgap = math.ceil((300 - wcal) / 2)
# # #                     imgwhite[:, wgap:wcal + wgap] = imgresize
# # #                     prediction, index = classifier.getPrediction(imgwhite)

# # #                 else:
# # #                     k = 300 / w
# # #                     hcal = math.ceil(k * h)
# # #                     himgresize = cv2.resize(crop, (300, hcal))
# # #                     himgresizeshape = himgresize.shape
# # #                     hgap = math.ceil((300 - hcal) / 2)
# # #                     imgwhite[hgap:hcal + hgap, :] = himgresize
# # #                     prediction, index = classifier.getPrediction(imgwhite)
# # #                 print(label[index])
# # #                 cv2.putText(imgoutput, label[index], (x, y - 20), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 255, 0), 2)
# # #                 cv2.rectangle(imgoutput, (x - 20, y - 20), (x + w + 20, y + h + 20), (0, 255, 0), 4)

# # #         _, jpeg = cv2.imencode('.jpg', imgoutput)
# # #         return jpeg.tobytes()

# # #     def update(self):
# # #         while True:
# # #             (self.grabbed, self.frame) = self.video.read()

# # # def gen(camera):
# # #     while True:
# # #         frame = camera.get_frame()
# # #         yield (b'--frame\r\n'
# # #                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

# # # def index(request):
# # #     return StreamingHttpResponse(gen(VideoCamera()), content_type='multipart/x-mixed-replace; boundary=frame')

# # # def home(request):
# # #     return render(request, 'index.html')










# class VideoCamera(object):
#     def __init__(self):
#         self.video = cv2.VideoCapture(0)
#         (self.grabbed, self.frame) = self.video.read()
#         threading.Thread(target=self.update, args=()).start()

#     def __del__(self):
#         self.video.release()

#     def get_frame(self):
#         imgoutput = self.frame.copy()
#         hands, img = detector.findHands(self.frame)
        
#         if hands:
#             # Create a blank white image
#             blank_image = np.ones_like(img) * 255

#         if len(hands) == 1:
#             # Get the hand landmarks
#             hand = hands[0]
#             landmarks = hand['lmList']
#             xo, yo, wo, ho = hand['bbox']
#             if len(landmarks) >= 21:
#                 # Draw the hand landmarks on the blank image
#                 for landmark in landmarks:
#                     x, y = landmark[:2]
#                     cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

#                 # Connect the hand landmarks with lines
#                 connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
#                                [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
#                                [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
#                 for connection in connections:
#                     start_point = landmarks[connection[0]][:2]
#                     end_point = landmarks[connection[1]][:2]
#                     cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
#             crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
#             cv2.imshow('img', crop)
#         elif len(hands) == 2:
#             x1, y1, w1, h1 = hands[0]['bbox']
#             x2, y2, w2, h2 = hands[1]['bbox']
#             xo = min(x1, x2)
#             yo = min(y1, y2)
#             wo = max(x1 + w1, x2 + w2) - xo
#             ho = max(y1 + h1, y2 + h2) - yo
#             # Crop the combined hand region
#             for hand in hands:
#                 # Get the hand landmarks
#                 landmarks = hand['lmList']

#                 if len(landmarks) >= 21:
#                     # Draw the hand landmarks on the blank image
#                     for landmark in landmarks:
#                         x, y = landmark[:2]
#                         cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

#                     # Connect the hand landmarks with lines
#                     connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
#                                    [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
#                                    [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
#                     for connection in connections:
#                         start_point = landmarks[connection[0]][:2]
#                         end_point = landmarks[connection[1]][:2]
#                         cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
#             crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
#             cv2.imshow('img', crop)

#         _, jpeg = cv2.imencode('.jpg', blank_image)
#         return jpeg.tobytes()

#     def update(self):
#         while True:
#             (self.grabbed, self.frame) = self.video.read()

# def gen(camera):
#     while True:
#         frame = camera.get_frame()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

# def index(request):
#     return StreamingHttpResponse(gen(VideoCamera()), content_type='multipart/x-mixed-replace; boundary=frame')

# # # def home(request):
# # #     return render(request, 'index.html')

# # def get_hand_gesture_prediction(image):
# #     # Initialize the HandDetector object
# #     detector = HandDetector(detectionCon=0.8, maxHands=2)
# #     classifier = Classifier('model.h5', 'labels.txt')
# #     label = ['A', 'B', 'C', 'D', 'E']

# #     # Find hands in the image
# #     hands, _ = detector.findHands(image)

# #     if hands:
# #         # Create a blank white image
# #         blank_image = np.ones_like(image) * 255

# #         if len(hands) == 1:
# #             # Get the hand landmarks
# #             hand = hands[0]
# #             landmarks = hand['lmList']
# #             xo, yo, wo, ho = hand['bbox']
# #             if len(landmarks) >= 21:
# #                 # Draw the hand landmarks on the blank image
# #                 for landmark in landmarks:
# #                     x, y = landmark[:2]
# #                     cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

# #                 # Connect the hand landmarks with lines
# #                 connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
# #                                [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
# #                                [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
# #                 for connection in connections:
# #                     start_point = landmarks[connection[0]][:2]
# #                     end_point = landmarks[connection[1]][:2]
# #                     cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
# #             crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
# #             prediction, index = classifier.getPrediction(crop)
# #             return label[index]

# #         elif len(hands) == 2:
# #             x1, y1, w1, h1 = hands[0]['bbox']
# #             x2, y2, w2, h2 = hands[1]['bbox']
# #             xo = min(x1, x2)
# #             yo = min(y1, y2)
# #             wo = max(x1 + w1, x2 + w2) - xo
# #             ho = max(y1 + h1, y2 + h2) - yo

# #             # Crop the combined hand region
# #             for hand in hands:
# #                 # Get the hand landmarks
# #                 landmarks = hand['lmList']

# #                 if len(landmarks) >= 21:
# #                     # Draw the hand landmarks on the blank image
# #                     for landmark in landmarks:
# #                         x, y = landmark[:2]
# #                         cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

# #                     # Connect the hand landmarks with lines
# #                     connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
# #                                    [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
# #                                    [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
# #                     for connection in connections:
# #                         start_point = landmarks[connection[0]][:2]
# #                         end_point = landmarks[connection[1]][:2]
# #                         cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
# #             crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
# #             prediction, index = classifier.getPrediction(crop)
# #             return label[index]

# # def video_stream(request):
# #     def gen():
# #         cap = cv2.VideoCapture(0)
# #         while True:
# #             success, img = cap.read()
# #             if not success:
# #                 break

# #             # Perform hand gesture recognition on the image
# #             prediction = get_hand_gesture_prediction(img)
# #             print(prediction)

# #             _, jpeg = cv2.imencode('.jpg', img)
# #             yield (b'--frame\r\n'
# #                    b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

# #     return StreamingHttpResponse(gen(), content_type='multipart/x-mixed-replace; boundary=frame')

# import cv2
# import numpy as np
# from django.http import StreamingHttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_GET, require_POST
# from cvzone.HandTrackingModule import HandDetector
# from cvzone.ClassificationModule import Classifier


# # @csrf_exempt
# # @require_GET
# # def index(request):
# #     return StreamingHttpResponse(gen(VideoCamera()), content_type='multipart/x-mixed-replace; boundary=frame')

# def get_hand_gesture_prediction(image, detector, classifier, label):
#     # Find hands in the image
    # hands, _ = detector.findHands(image)

    # if hands:
    #     # Create a blank white image
    #     blank_image = np.ones_like(image) * 255

    #     if len(hands) == 1:
    #         # Get the hand landmarks
    #         hand = hands[0]
    #         landmarks = hand['lmList']
    #         xo, yo, wo, ho = hand['bbox']
    #         if len(landmarks) >= 21:
    #             # Draw the hand landmarks on the blank image
    #             for landmark in landmarks:
    #                 x, y = landmark[:2]
    #                 cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

    #             # Connect the hand landmarks with lines
    #             connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
    #                            [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
    #                            [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
    #             for connection in connections:
    #                 start_point = landmarks[connection[0]][:2]
    #                 end_point = landmarks[connection[1]][:2]
    #                 cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)
    #         crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
    #         prediction, index = classifier.getPrediction(crop)
    #         return label[index]

    #     elif len(hands) == 2:
    #         x1, y1, w1, h1 = hands[0]['bbox']
    #         x2, y2, w2, h2 = hands[1]['bbox']
    #         xo = min(x1, x2)
    #         yo = min(y1, y2)
    #         wo = max(x1 + w1, x2 + w2) - xo
    #         ho = max(y1 + h1, y2 + h2) - yo

    #         # Crop the combined hand region
    #         for hand in hands:
    #             # Get the hand landmarks
    #             landmarks = hand['lmList']

    #             if len(landmarks) >= 21:
    #                 # Draw the hand landmarks on the blank image
    #                 for landmark in landmarks:
    #                     x, y = landmark[:2]
    #                     cv2.circle(blank_image, (x, y), 5, (0, 0, 255), cv2.FILLED)

    #                 # Connect the hand landmarks with lines
    #                 connections = [[0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8],
    #                                [9, 10], [10, 11], [11, 12], [13, 14], [14, 15], [15, 16],
    #                                [17, 18], [18, 19], [19, 20], [0, 5], [0, 17]]
    #                 for connection in connections:
    #                     start_point = landmarks[connection[0]][:2]
    #                     end_point = landmarks[connection[1]][:2]
    #                     cv2.line(blank_image, start_point, end_point, (0, 255, 0), 2)

    #         crop = blank_image[yo - 20:yo + ho + 20, xo - 20:xo + wo + 20]
    #         prediction, index = classifier.getPrediction(crop)
    #         return label[index]

#     return 'No hands detected'


# # @csrf_exempt
# # @require_POST
# # def video_stream(request):
# #     def stream_video():
# #         cap = cv2.VideoCapture(0)
# #         detector = HandDetector(max_hands=2)
# #         classifier = Classifier()
# #         label = classifier.getLabel()
# #         while True:
# #             _, frame = cap.read()

# #             # Convert the frame to grayscale
# #             gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

# #             # Perform hand detection on the frame
# #             hands, _ = detector.findHands(gray)

# #             # Check if hands are detected
# #             if hands:
# #                 # Convert the frame to RGB for display
# #                 rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

# #                 # Encode the frame as JPEG
# #                 _, jpeg = cv2.imencode('.jpg', rgb_frame)

# #                 # Send the JPEG frame as a byte stream
# #                 yield (b'--frame\r\n'
# #                        b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

# #             else:
# #                 # If no hands are detected, send a placeholder image
# #                 placeholder_image = np.zeros((480, 640, 3), dtype=np.uint8)
# #                 _, jpeg = cv2.imencode('.jpg', placeholder_image)
# #                 yield (b'--frame\r\n'
# #                        b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

# #     return StreamingHttpResponse(stream_video(), content_type='multipart/x-mixed-replace; boundary=frame')
