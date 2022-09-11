## Auto-Login website for Alpha Knights sign in forms
### Additional information:
Cookies - https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

### Backend:
If a user doesn't login, their enter time is set to as when the club meeting starts. If the user doesn't exit, their exit time is set to when the club meeting ends

### Request methods:
(Make sure to use post when firing)
(All contain JSONs as responsees)

#### /gen/
Paramters: none  
Generates a csv string containing all of the students, their enter times and their exit times

#### /entry/
Paramters: Name, id, grade  
Adds a user to the database, their enter time is registered

#### /exit/
Paramters: Name, id, grade  
Gives a user in the database an exit time, their exit time is registered. If a user isn't in the data base yet, they are given an enter time of when the club starts 
