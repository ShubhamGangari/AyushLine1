Add-Type -AssemblyName System.Drawing

function MakeTransparentAndClean($filePath, $outPath) {
    $fullIn = [System.IO.Path]::GetFullPath($filePath)
    $fullOut = [System.IO.Path]::GetFullPath($outPath)

    if (-not (Test-Path $fullIn)) {
        Write-Host "File not found: $fullIn"
        return
    }

    $bmp = [System.Drawing.Bitmap]::FromFile($fullIn)
    $output = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)

    for ($x = 0; $x -lt $bmp.Width; $x++) {
        for ($y = 0; $y -lt $bmp.Height; $y++) {
            $pixel = $bmp.GetPixel($x, $y)
            $r = $pixel.R
            $g = $pixel.G
            $b = $pixel.B

            # Check if pixel is part of dark navy background
            $isDarkNavy = ($r -lt 35 -and $g -lt 60 -and $b -lt 85)
            $isBlackStroke = ($r -lt 25 -and $g -lt 25 -and $b -lt 25 -and $y -lt 30)

            if ($isDarkNavy -or $isBlackStroke) {
                $output.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $output.SetPixel($x, $y, $pixel)
            }
        }
    }

    $output.Save($fullOut, [System.Drawing.Imaging.ImageFormat]::Png)
    $output.Dispose()
    $bmp.Dispose()
}

$dir = 'd:\AyushLine\public\icons'
MakeTransparentAndClean("$dir\unani.png", "$dir\unani_transparent.png")
MakeTransparentAndClean("$dir\siddha.png", "$dir\siddha_transparent.png")
MakeTransparentAndClean("$dir\homeopathy.png", "$dir\homeopathy_transparent.png")

if (Test-Path "$dir\unani_transparent.png") { Move-Item -Path "$dir\unani_transparent.png" -Destination "$dir\unani.png" -Force }
if (Test-Path "$dir\siddha_transparent.png") { Move-Item -Path "$dir\siddha_transparent.png" -Destination "$dir\siddha.png" -Force }
if (Test-Path "$dir\homeopathy_transparent.png") { Move-Item -Path "$dir\homeopathy_transparent.png" -Destination "$dir\homeopathy.png" -Force }

Write-Host "Icons background made transparent successfully!"
