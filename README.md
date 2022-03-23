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

 * TEST URL : http://localhost:5000/?img=\\asmet032\aims_data2\EASEMENT_IMAGES\01_FOTI_BANKSTOWN\20190115_02\02_201901070919_02585.jpg

 * https://webgisnv.rail.nsw.gov.au/FOTI/?img=\\asmet032\AIMS_DATA2\EASEMENT_IMAGES\03_FOTI_EAST_HILLS\20200109_05\05_20200109_04732_11.31km.jpg
 


POLE TESTING LINKS:

 * TEST URL : http://localhost:5000/?img=\\asmet032\AIMS_DATA2\field_data\2016\Pole%20Top\873\20151208fdr0873pole0112.JPG&img1=\\asmet032\AIMS_DATA2\field_data\2018\Pole%20Top\Western\873_112.jpg&PTIV=2

 * https://webgisnv.rail.nsw.gov.au/FOTI/?img=\\asmet032\AIMS_DATA2\field_data\2016\Pole%20Top\873\20151208fdr0873pole0112.JPG&img1=\\asmet032\AIMS_DATA2\field_data\2018\Pole%20Top\Western\873_112.jpg&PTIV=2

POSTMAN TEST:
