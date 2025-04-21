#include<stdio.h>
#include<conio.h>
#include<graphics.h>
void drawline(int x0, int y0, int x1, int y1)
{
int dx, dy, p, x, y;
dx = x1 - x0;
dy = y1 - y0;
x = x0;
y = y0;
p = 2*dy-dx;
while(x<x1)
if(p>=0)
{
putpixel(x,y,3);
y++;
p = p+2*dy-2*dx;
}
else
{
putpixel(x,y,3);
p=p+2*dy;
}
x++;
}
void main()
{
int gdriver=DETECT, gmode, rooro, x0, y0, x1, y1;
initgraph(&gdriver, &gmode, "C:\\TURBOC3\\BGI");
printf("Enter Coordinates of first point");
scanf("%d%d", &x0, &y0);
printf("Enter coordinates of second point");
scanf("%d%d", &x1, &y1);
drawline(x0, y0, x1, y1);
closegraph();
getch();
}

























