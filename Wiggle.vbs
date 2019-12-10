'
'
'

NODE = "npm start"
FFOX = """C:\Program Files\Mozilla Firefox\firefox.exe"" http://localhost:3000"
KILL_NODE = "taskkill /im node.exe /t /f"
KILL = "taskkill /im cmd.exe /t /f /fi ""WINDOWTITLE eq n*"""

Set shell = WScript.CreateObject("WScript.Shell")

shell.Run NODE, 1, False
shell.Run FFOX, 1, True

strComputer = "."
Set oWMI = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")
Set colEvents = oWMI.ExecNotificationQuery( _
    "SELECT * FROM __InstanceDeletionEvent WITHIN 1 " &_
    "WHERE TargetInstance ISA 'Win32_Process' " &_
    "AND TargetInstance.Name = 'firefox.exe'")
Set oEvent = colEvents.NextEvent

shell.Run KILL_NODE, 0, False
shell.Run KILL, 0, False

'
'
'