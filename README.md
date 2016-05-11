swe-angular-own
======================
Own implementation of Jürgens Abgabe 2 in SWE - Angular frontend impl of given backend

Backend start
----------------------
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