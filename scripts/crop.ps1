Add-Type -AssemblyName System.Drawing

$srcPath = "D:\Codesinc\acs\acs\public\ACS Kenya Technology Store Homepage.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)

function Crop-Image($x, $y, $w, $h, $destName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $dest = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $outPath = "D:\Codesinc\acs\acs\public\images\" + $destName
    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved $destName ($w x $h)"
}

# Logo
Crop-Image 30 25 110 32 "acs-logo.png"

# Hero tech composition
Crop-Image 340 70 380 340 "hero-tech-showcase.png"

# Categories
Crop-Image 75 550 70 65 "cat-servers.png"
Crop-Image 210 550 125 65 "cat-laptops.png"
Crop-Image 400 545 90 70 "cat-printers.png"
Crop-Image 575 545 75 70 "cat-accessories.png"

Crop-Image 45 685 115 50 "cat-networking.png"
Crop-Image 235 680 80 60 "cat-storage.png"
Crop-Image 400 680 90 60 "cat-desktops.png"
Crop-Image 575 675 70 65 "cat-software.png"

# Products
Crop-Image 50 930 140 52 "prod-hp-server.png"
Crop-Image 225 930 140 52 "prod-dell-server.png"
Crop-Image 400 900 125 80 "prod-hp-elitebook.png"
Crop-Image 570 895 115 85 "prod-dell-latitude.png"

Crop-Image 65 1085 90 70 "prod-hp-printer.png"
Crop-Image 225 1100 125 45 "prod-tplink-switch.png"
Crop-Image 405 1075 100 75 "prod-dell-monitor.png"
Crop-Image 585 1075 60 75 "prod-wd-harddrive.png"

# Why choose specialist
Crop-Image 505 1250 215 230 "why-choose-specialist.png"

# Corporate building
Crop-Image 25 1495 220 180 "corporate-building.png"

# James Mwangi testimonial avatar
Crop-Image 375 1630 35 35 "testimonial-avatar-1.png"

# Newsletter cyber laptop
Crop-Image 420 1700 295 150 "newsletter-laptop.png"

$src.Dispose()
Write-Host "Crops updated successfully!"
