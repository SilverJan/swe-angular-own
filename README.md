swe-angular-own
======================
This is the frontend implementation for my uni project in University of Applied Science Karlsruhe Bachelor Degree Business Informatics in subject 'Softwareentwicklung' in summer term 16 (SS16). We were given a WildFly backend (shop implementation) with a REST interface. The task was building a frontend with Angular 2.

Framework: Angular 2<br>
Language: TypeScript<br>
CSS Library: Bootstrap and Custom<br>
Build Tool: Gulp<br>

IDE Settings (WebStorm)
----------------------
File/Settings/Languages & Frameworks/JavaScript set ECMAScript 6

STEP 1: Init & Install Frontend
----------------------
Do the following command in the frontend project directory

    npm install
    
STEP 2: Backend deployment
----------------------
Load project from ILIAS and save somewhere (== backend-project-dir)

    cd <backend-project-dir>
    gradlew assemble
    gradlew deploy
Once deployed, the server starts always with the same .war file. This step must be done only once.


STEP 3: Start Frontend and Backend
----------------------
See headings below! Order is irrelevant, you just have to start both without gulp or wildfly errors.

But one more thing: When everything has started, open a new chrome tab with the following URI and accept the security info: https://localhost:8443/shop/rest

Frontend start
----------------------
    gulp run
Cleans build dir, starts code style formatters, builds project files, starts webserver, starts watch task

For single tasks, see gulpfile

Backend start
----------------------
Before start: Edit C:\Zimmermann\wildfly\standalone\configuration\standalone.xml

    <response-header name="cors-origin" header-name="Access-Control-Allow-Origin" header-value="https://localhost"/>
to (Add port 8000 to URI):

    <response-header name="cors-origin" header-name="Access-Control-Allow-Origin" header-value="https://localhost:8000"/>


### Batch file (fancy!)
Start via batch file (in project directory)

    runbackend.bat
Shutdown with Enter click (see batch instructions)

#### Manual start (lame..)
    // H2
    java -cp C:\Zimmermann\maven-repository\com\h2database\h2\1.4.191\h2-1.4.191.jar ^ org.h2.tools.Console -webAllowOthers -tcpAllowOthers
    // wildfly
    cd %JBOSS_HOME%
    powershell -executionpolicy bypass -file bin\standalone.ps1

#### Manual shutdown (lame..)
    // H2
    java -cp C:\Zimmermann\maven-repository\com\h2database\h2\1.4.191\h2-1.4.191.jar ^ org.h2.tools.Console -tcpShutdown tcp://localhost
    // wildfly
    jboss-cli -c --command=shutdown


Backend doku
----------------------
Swagger (Swogger): [https://localhost:8443/api-docs/#/](https://localhost:8443/api-docs/#/)

Javadoc:

    cd <wildfly-project-dir>
    gradlew javadoc
index.html: <wildfly-project-dir>/build/docs/javadoc/index.html

ClangFormat error fixes HOWTO
----------------------
      .\node_modules\clang-format\bin\win32\clang-format -i -style="file" src\...\myfile.ts
