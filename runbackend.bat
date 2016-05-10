@echo off
echo This will start H2 and wildlfy

START java -cp C:\Zimmermann\maven-repository\com\h2database\h2\1.4.191\h2-1.4.191.jar ^ org.h2.tools.Console -webAllowOthers -tcpAllowOthers
START /D %JBOSS_HOME% powershell -executionpolicy bypass -file bin\standalone.ps1

echo.
echo ########################################
echo ### Hit enter to kill both processes ###
echo ########################################
echo.

runas /user:# "" >nul 2>&1

::taskkill /im java.exe
::taskkill /im powershell.exe
java -cp C:\Zimmermann\maven-repository\com\h2database\h2\1.4.191\h2-1.4.191.jar ^ org.h2.tools.Console -tcpShutdown tcp://localhost
jboss-cli -c --command=shutdown
pause