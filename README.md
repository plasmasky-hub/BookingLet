P3 Bookinglet
=======
We plan to create an online booking website for massage/nail stores. The main features include store searching, checking store services and working hours, booking services and service time, appointment management, and simple comments on the appointments.

Group members:
-----
Xiang Ji (Team leader)

Jet Zhang

Derek Zhu

Xiaoman Li

XR LIU

Longcan

Yvonne

Lin

Yibo (devops)

Features
----------
![](https://github.com/plasmasky-hub/P3/blob/readme/README/Main_Page.png)
The website will include two main pages, one for customers and another for store owners. Any guest could use basic searching feature and check store information, while further features will require guests to login as users. Users will be divided into two groups depending on their role: customers and store owners.

The customer page includes personal profile and all features that available to guest. In profile customer could manage thier personal information, appointments, and liked store list.
The store owner page includes store information. Owners could check and edit store information, services, timetables and current appointments.

Data structure
----------
![](https://github.com/plasmasky-hub/P3/blob/readme/README/Database_diagram.png)

The following figures are the data structure of the booking system (for business). It includes the first iteration version, and the final target version.

![](https://github.com/RedRe4per/MyPicture/blob/main/JR-P3/business_serviceInfo_structure_interation1.png)

![](https://github.com/RedRe4per/MyPicture/blob/main/JR-P3/business_serviceInfo_struture_final_version.png)

Tech Stack
---------
Front-end: 
React, ReduxToolKit, Hooks, Styled Component, TypeScript, MUI, dotenv, Google Map

Back-end: 
Nodejs, Express, JWT, TypeScript, Lambda

Database: 
MongoDB Atlas

Testing:
Unit&Integration Test: Jest, ReactTestingLibrary 

Future features
----------
The searching function will only have keyword searching. Will add the sorts and filters.
Store evaluation will show the number of customers who liked the store. Will add star evaluation, favorite, or comment features in the future.
Planing to add notification features to inform customers and store owners.
