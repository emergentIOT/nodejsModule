FOTI: Front of Train Image 
Converting FOTI WAR file project to NODE JS module 

FOTI Project files: \\asmet360\d$\Smallworld_430\gss430-jboss-6.1.0.Final\server\default\deploy\FOTI.war

1. Copy NODE JS dir to C:\newModule\nodejsModule


2. SETUP as a Windows service: 
* This appliction is setup as a service using NSSM for windows system
    - https://nssm.cc/usage
    - start-server.bat file is used to start the application as a service

3. IMAGES DIR:

Create mklink:
CMD as ADMIN: mklink /d <link> <target>

    /d : Creates a directory symbolic link. By default, this command creates a file symbolic link.
    <link> : Specifies the name of the symbolic link being created.
    <target> : Specifies the path (relative or absolute) that the new symbolic link refers to.

AIMS_DATA2 is a makelink folder with target link.


FOTI TESTING LINKS:

 * UAT-TEST URL: http://asmet360.rail.nsw.gov.au:4000/?img=\\asmet032\AIMS_DATA2\EASEMENT_IMAGES\01_FOTI_BANKSTOWN\20200114_05\05_20200114_2680_13.61km.jpg

 * LOCAL-TEST URL : http://localhost:4000/?img=\\asmet032\AIMS_DATA2\EASEMENT_IMAGES\01_FOTI_BANKSTOWN\20200114_05\05_20200114_2680_13.61km.jpg 


POLE TESTING LINKS:

 * UAT-TEST URL : http://asmet360.rail.nsw.gov.au:4000/?img=\\asmet032\AIMS_DATA2\field_data\2018\Pole%20Top\City%20West\623_PP4.jpg&PTIV=1

 * LOCAL-TEST URL : http://localhost:4000/?img=\\asmet032\AIMS_DATA2\field_data\2018\Pole%20Top\City%20West\623_PP4.jpg&PTIV=1


