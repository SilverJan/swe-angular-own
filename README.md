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
*H2*

    java -cp C:\Zimmermann\maven-repository\com\h2database\h2\1.4.191\h2-1.4.191.jar ^ org.h2.tools.Console -webAllowOthers -tcpAllowOthers

*Wildfly*

    cd %JBOSS_HOME%
    powershell -executionpolicy bypass -file bin\standalone.ps1

#### Manual shutdown (lame..)
*H2*

    java -cp C:\Zimmermann\maven-repository\com\h2database\h2\1.4.191\h2-1.4.191.jar ^ org.h2.tools.Console -tcpShutdown tcp://localhost

*Wildfly*

    jboss-cli -c --command=shutdown