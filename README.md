swe-angular-own
======================
Own implementation of Jürgens Abgabe 2 in SWE - Angular frontend impl of given backend

IDE Settings (WebStorm)
----------------------
File/Settings/Languages & Frameworks/JavaScript set ECMAScript 6

Init & Install
----------------------
    npm install


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

Backend deployment
----------------------
    cd <wildfly-project-dir>
    gradlew assemble
    gradlew deploy

Once deployed, the server starts always with the same .war file

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
