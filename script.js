document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const qrcodeContainer = document.getElementById('qrcode');
    const downloadBtn =document.getElementById('downloadbtn');
    const ssid = document.getElementById('ssid').value.trim();

    // Initialize QRCode instance
    // The library will append a canvas element inside this container
    let qr = new QRCode(qrcodeContainer, {
        width: 250,
        height: 250,
        classList: "canvas",
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H // High error correction
    });
  //   qr.classList.add("canvas");

    generateBtn.addEventListener('click', generateQRCode);

    function generateQRCode() {
        const password = document.getElementById('password').value;
        const encryption = document.getElementById('encryption').value;
        const isHidden = document.getElementById('hidden').checked;

        if (!ssid) {
            alert('Please enter the SSID (Network Name).');
            return;
        }

        // 1. Clear any previous QR code
        qrcodeContainer.innerHTML = '';
        // Re-initialize the QR code object to ensure it's fresh for the new generation
        qr = new QRCode(qrcodeContainer, {
            width: 250,
            height: 250,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        // 2. Build the Wi-Fi configuration string
        // Format: WIFI:T:<Encryption Type>;S:<SSID>;P:<Password>;H:<Hidden status>;
        
        let wifiData = `WIFI:T:${encryption};S:${ssid};P:${password};`;
        
        // The 'H' parameter (Hidden status) is only included if true
        if (isHidden) {
            wifiData += `H:true;`;
        }
        
        // Final semicolon is essential for proper parsing
        wifiData += `;`;

        // 3. Generate the QR Code
        qr.makeCode(wifiData);
        
       console.log("Generated Wi-Fi String:", wifiData);
    }
    
    downloadBtn.addEventListener('click', () => {
    	  const  canvas= document.querySelector("canvas");
            const imageURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imageURL;
            downloadLink.download = `${ssid}network.png';
            downloadLink.click();
            downloadLink.remove(); // Clean up the temporary element
        });

});
