
# -- URL FORMAT --
# http://www.foliagenetwork.com/images/stories/reports/
# [northeast_us,midwest_us,southeast_us]/
# [mm:08-11][dd:01-31][yyyy:2008-2016]_[lc,ld].gif

import requests
import pdb
from time import sleep

def download_imgs():
  base_url = 'http://www.foliagenetwork.com/images/stories/reports/{}/{}{}{}_{}.gif'
  
  regions = ['northeast_us', 'midwest_us', 'southeast_us']
  months = ['%02d' % mm for mm in range(10, 12)]
  days = ['%02d' % dd for dd in range(1, 32)]
  years = [str(yyyy) for yyyy in range(2008, 2017)]
  img_types = ['lc', 'ld']

  tuples = [[r,m,d,y,i] for r in regions for m in months for d in days for y in years for i in img_types]

  for t in tuples:
    url = base_url.format(*t)
    fname = 'imgs/{}_{}_{}_{}_{}.gif'.format(*t)
    
    response = requests.get(url, stream=True)
    if response.ok:
      sleep(3)
      print("Retrieving: " + fname)
      with open(fname, 'wb') as handle:
        for block in response.iter_content(1024):
          if not block:
            break
          handle.write(block)
                
    
if __name__ == '__main__':
  download_imgs()