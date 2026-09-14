Add-Type -AssemblyName System.Drawing

$srcPath = 'C:\Users\Shubham\.gemini\antigravity-ide\brain\a4ba7902-84c0-46ca-a884-5f26f4ce2284\.tempmediaStorage\media_a4ba7902-84c0-46ca-a884-5f26f4ce2284_1788951397088.png'
$outDir = 'd:\AyushLine\public\icons'

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# 1. Unani Icon (Row 1, Col 2: Potion Flask)
# Bounding box roughly: x=220, y=70, w=100, h=110
$rectUnani = New-Object System.Drawing.Rectangle(225, 75, 95, 105)
$cropUnani = $bmp.Clone($rectUnani, $bmp.PixelFormat)
$cropUnani.Save("$outDir\unani.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropUnani.Dispose()

# 2. Siddha Icon (Row 2, Col 1: Stone Mortar & Pestle)
# Bounding box roughly: x=125, y=215, w=100, h=105
$rectSiddha = New-Object System.Drawing.Rectangle(125, 215, 95, 105)
$cropSiddha = $bmp.Clone($rectSiddha, $bmp.PixelFormat)
$cropSiddha.Save("$outDir\siddha.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropSiddha.Dispose()

# 3. Homeopathy Icon (Row 3, Col 2: Test Tube with Pills & Leaf)
# Bounding box roughly: x=225, y=350, w=95, h=115
$rectHomeo = New-Object System.Drawing.Rectangle(225, 350, 95, 115)
$cropHomeo = $bmp.Clone($rectHomeo, $bmp.PixelFormat)
$cropHomeo.Save("$outDir\homeopathy.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropHomeo.Dispose()

$bmp.Dispose()
Write-Host "Icons cropped and saved successfully in $outDir!"
