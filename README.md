# Software-Development-tool-Data-Visualisation-

Beschreibung des Projekt:
In diesem Projekt geht es um die Visualisierung von Datenaustausch zwischen Java Methoden als ein Graph. Als Eingabe wird ein xml file hochgeladen, der die Informationen zum Datenfluss enthält. Als Ausgabe wird den Graph angezeigt. Die Methoden werden als Knoten dargestellt und die Kanten stellen den Datenfluss zwischen zwei Methoden dar. Dabei werden zusätzliche Funktionen implementiert um mit dem Graph umgehen zu können.

Projekt Starten:
Um das Projekt zu sehen muss folgendes gemacht werden:
1. Die Files in VS Code öffnen 
2. DataWeb.html durch liver server extention öffnen
3. Auf choose file klicken und den File FD_OUTPUT_EXAMPLE.xml 
4. jetzt wird der Graph angezeigt

Die Funktionen der Buttons im Topbar:
Clear: löscht den existierenden Graph und ermöglicht erneut das hochladen von xml file
Reset: zeigt das Graph in orginal Form
Expand: zeigt die Knoten weit auseinander
Shrink: 
Filter: zeigt den pfad von source- bis sinkknote an
Commit: wenn einer knoten geklickt ist und dann auf commit klicken dann wird commit das Kommentar in "comment" Feld in dieser Knote gespeichert
Name: wenn einer knoten geklickt ist und Name klicken dann wird das Name von den Mehtode angezeigt
Capture: macht einen screenshot von dem Graph
Download: den hochgeladene xml file wird als Json file heruntergeladen


