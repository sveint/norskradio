import urllib
import os
import json

url_failed = []
logo_failed = []

with open('channels.json') as f:
    channels = json.load(f)

    for channel in channels:
        passed = False
        try: 
            url_ok = urllib.urlopen(channel['url']).read(1024)
            logo_ok = os.path.exists(os.path.join('logos', channel['logo'] + '.png'))
            
            if not url_ok:
                url_failed.append(channel)
            if not logo_ok:
                logo_failed.append(channel)
            if url_ok and logo_ok:
                passed = True

        except Exception:
            failed.append(channel)
        print u'{}: {}'.format(channel['name'], passed)

if url_failed or logo_failed:
    tasks = [
        (url_failed, 'URLs', 'url'),
        (logo_failed, 'logos', 'logo'),
    ]
    for task in tasks:
        failed = task[0]
        if failed:
            print '-- {} channel {} failed:'.format(len(failed), task[1])
            for channel in failed:
                print u'{}: {}'.format(channel['name'], channel[task[2]])
else:
    print '-- All good!'
