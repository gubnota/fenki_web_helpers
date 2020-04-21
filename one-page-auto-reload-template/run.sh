#!/bin/bash
if [ "$(type -t when-changed)" = "file" ]; then
	echo "when-changed -r assets ./watchdog.php"
	when-changed -r assets ./watchdog.php
else
echo "Install: when-changed “pip install when-changed”"
fi
