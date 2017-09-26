import urllib
import os
import json

AAC_MAGIC = [0xff, 0xf1]
MP3_MAGIC = [0xff, 0xfb]
ICY_MAGIC = [0x49, 0x43, 0x59]
FLAC_MAGIC = [0x66, 0x4C, 0x61, 0x43]


url_failed = []
logo_failed = []

def is_stream(data):
    for test in [AAC_MAGIC, MP3_MAGIC, ICY_MAGIC, FLAC_MAGIC]:
        if all(a == ord(b) for a, b in zip(test, data)):
            return True


with open('channels.json') as f:
    channels = json.load(f)

    for channel in channels:
        passed = False
        try:
            stream = urllib.urlopen(channel['url']).read(2)
            url_ok = is_stream(stream)
            logo_ok = os.path.exists(os.path.join('logos', channel['logo'] + '.png'))

            if not url_ok:
                url_failed.append(channel)
            if not logo_ok:
                logo_failed.append(channel)
            if url_ok and logo_ok:
                passed = True

        except Exception:
            url_failed.append(channel)
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
