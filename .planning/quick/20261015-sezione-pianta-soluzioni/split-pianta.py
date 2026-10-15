import re, sys, json
src, out = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8-sig').read()
walls = [p.strip() + ' Z' for p in re.search(r'<path d="([^"]*)"', s).group(1).split('Z') if p.strip()]
segs = []  # (d, pts, filled)
for m in re.finditer(r'<line x1="(\d+)" y1="(\d+)" x2="(\d+)" y2="(\d+)"[^>]*?fill="(\w+)"', s):
    x1,y1,x2,y2 = map(int, m.groups()[:4]); segs.append(([(x1,y1),(x2,y2)], m.group(5)))
for m in re.finditer(r'<polyline points="([^"]*)"[^>]*?fill="(\w+)"', s):
    segs.append(([tuple(map(int,p.split(','))) for p in m.group(1).split()], m.group(2)))
def inside(x,y):  # L-shaped footprint incl. outer wall thickness
    return (428<=x<=2897 and 588<=y<=1934) or (1727<=x<=2897 and 1887<=y<=4485)
def band(x,y):  # within outer wall thickness
    return (x<=483 or x>=2841 or y<=643 or y>=4430 or (x<1775 and y>=1879) or (y>1934 and x<=1783))
edges=[]
for w in walls:
    toks=re.findall(r'[MHVZ]|-?\d+', w.replace(',',' '))
    i=0; x=y=sx=sy=0
    while i<len(toks):
        t=toks[i]
        if t=='M': x,y=int(toks[i+1]),int(toks[i+2]); sx,sy=x,y; i+=3
        elif t=='H': nx=int(toks[i+1]); edges.append(('h',y,min(x,nx),max(x,nx))); x=nx; i+=2
        elif t=='V': ny=int(toks[i+1]); edges.append(('v',x,min(y,ny),max(y,ny))); y=ny; i+=2
        elif t=='Z':
            if x==sx: edges.append(('v',x,min(y,sy),max(y,sy)))
            elif y==sy: edges.append(('h',y,min(x,sx),max(x,sx)))
            x,y=sx,sy; i+=1
        else: i+=1
def on_edge(a,b):
    (x1,y1),(x2,y2)=a,b
    T=2
    for o,c,lo,hi in edges:
        if o=='h' and abs(y1-c)<=T and abs(y2-c)<=T and min(x1,x2)>=lo-T and max(x1,x2)<=hi+T: return True
        if o=='v' and abs(x1-c)<=T and abs(x2-c)<=T and min(y1,y2)>=lo-T and max(y1,y2)<=hi+T: return True
    return False
groups = {'esterni':[], 'aperture':[], 'scale':[]}
dropped=0
for pts, fill in segs:
    if all(on_edge(pts[i],pts[i+1]) for i in range(len(pts)-1)):
        dropped+=1; continue
    allin = all(inside(*p) for p in pts)
    if not allin: g='aperture' if len(pts)>2 else 'esterni'  # polylines outside = shutter swings
    elif all(band(*p) for p in pts): g='aperture'
    else: g='scale'
    groups[g].append('M' + ' L'.join(f'{x} {y}' for x,y in pts))
print({k:len(v) for k,v in groups.items()}, 'walls', len(walls), 'dropped', dropped, file=sys.stderr)
J = lambda v: json.dumps(v)
wl = ''.join('\n    ' + J(w) + ',' for w in walls)
ts = f"""// content/piantaPontecchio.ts
// GENERATO da .planning/quick/20261015-sezione-pianta-soluzioni/split-pianta.py a partire da "pianta pontecchio.svg": export ZWCAD,
// scala 1:100 a 300 dpi, quindi 1 unità = 8,4667 mm. Non modificare a mano.

export const piantaPontecchio = {{
  /** Muri pieni, un path per pezzo, nell'ordine del CAD. */
  walls: [{wl}
  ],
  /** Finestre e ante. */
  openings: {J(' '.join(groups['aperture']))},
  /** Rampe delle due scale. */
  stairs: {J(' '.join(groups['scale']))},
  /** Balconi e logge (contorni esterni). */
  outside: {J(' '.join(groups['esterni']))},
}} as const;
"""
open(out, 'w').write(ts)
