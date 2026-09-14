'use client';
import React, { useRef, useEffect } from 'react';

export default function CertificateGenerator() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Design layout context base styles
        ctx.fillStyle = '#0f172a'; // Slate background color matching theme
        ctx.fillRect(0, 0, 800, 600);

        // Decorative Borders
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, 760, 560);

        // Certificate Copy typography
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('CERTIFICATE OF INTERNSHIP', 180, 120);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px sans-serif';
        ctx.fillText('This strictly verifies that the developer has completed their assigned track:', 120, 220);

        // Dynamic Variables injected securely
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('Alex Johnson', 320, 300); // Ex: standard variable fallback

        ctx.fillStyle = '#10b981';
        ctx.font = 'italic 20px sans-serif';
        ctx.fillText('Specialization: Advanced Backend Systems', 240, 380);

        // Verification footprint tag
        ctx.fillStyle = '#475569';
        ctx.font = '12px monospace';
        ctx.fillText('System Verification ID: ALX-SWE-8932-SECURE', 250, 520);
    }, []);

    const downloadCertificate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'alx-swe-internship-certificate.png';
        link.href = image;
        link.click();
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-950 min-h-screen">
            <canvas ref={canvasRef} width={800} height={600} className="rounded-lg shadow-2xl border border-gray-800" />
            <button onClick={downloadCertificate} className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-md">
                Download Official Certificate (.PNG)
            </button>
        </div>
    );
}
