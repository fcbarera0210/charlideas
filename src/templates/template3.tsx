import { useState, useRef, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { 
  ArrowUpRight, 
  Code,
  Layout,
  Layers,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  Github
} from 'lucide-react';
import { getFeaturedProjects } from '../data/projects';
import { SEO } from '../components/SEO';
import { motion, useInView } from 'framer-motion';

// --- BRAND ASSETS ---

const CharlideasLogo = ({ className = "h-12 w-12" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214.18 214.18">
    <path fill="#00B4B9" d="M162.22,214.18H52a52.11,52.11,0,0,1-52-52V52A52.11,52.11,0,0,1,52,0H162.22a52.11,52.11,0,0,1,52,52V162.22A52.11,52.11,0,0,1,162.22,214.18Z"/>
    <path fill="#fefefe" d="M121.45,156.74c-12.34,14-28.93,22.23-43,20.65-31.87-3.59-47.88-29.71-45-55.35C35.37,105,46,89.77,62,80.58c16.52-9.6,31.41-11,41.8-9.79,8.78,1,15.88,4.36,19.7,7.82a9.75,9.75,0,0,1,3.43,9c-1,6.45-8.15,12.18-11.85,11.77-1.62-.18-3.16-1.06-4.79-3.11-9-9.44-16.44-14-22.67-14.72-9-1-20.85,6.55-23.66,31.49-3.45,30.72,17.83,43.16,27.76,44.28,9.47,1.07,16.69-.69,25.8-6.92Z"/>
    <path fill="#fefefe" d="M142.1,23c7.89,0,19.29,1.4,19.52,10.23a82.41,82.41,0,0,1-.94,10.22c-2.32,14.88-9.06,64.69-13,94H136.52c-3.26-27-10-77.24-12.79-93.28a59.64,59.64,0,0,1-1.62-10.92c0-8.14,11.62-10.23,20-10.23Zm.34,163.78a19.41,19.41,0,1,1,18.95-19.4,19.16,19.16,0,0,1-18.95,19.4Z"/>
  </svg>
);

const LukitaLogo = ({ className = "h-8 w-auto" }) => (
  <svg className={className} viewBox="0 0 289.69 128.94" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lukita-grad" y1="82.84" x2="152.92" y2="82.84" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00c6db"/><stop offset="1" stopColor="#96e148"/>
      </linearGradient>
      <linearGradient id="lukita-grad-2" x1="19.86" y1="64.47" x2="172.78" y2="64.47" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00c6db"/><stop offset="1" stopColor="#96e148"/>
      </linearGradient>
      <linearGradient id="lukita-grad-3" x1="39.71" y1="46.1" x2="289.69" y2="46.1" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#00c6db"/><stop offset="1" stopColor="#96e148"/>
      </linearGradient>
    </defs>
    <polygon fill="url(#lukita-grad)" points="60.64 117 21.64 36.75 0 36.75 44.81 128.94 152.92 104.14 60.64 117"/>
    <polygon fill="url(#lukita-grad-2)" points="80.49 98.63 41.49 18.37 19.86 18.37 64.66 110.57 172.78 98.63 80.49 98.63"/>
    <path fill="url(#lukita-grad-3)" d="M284.57,82h-93a5.12,5.12,0,0,1,0-10.24h66.32a5.13,5.13,0,0,0,0-10.25H210.81a5.12,5.12,0,0,1,0-10.24H222.1a5.12,5.12,0,1,0,0-10.24H153.54a5.13,5.13,0,0,1,0-10.25H232.2a5.12,5.12,0,1,0,0-10.24H183.86a5.13,5.13,0,0,1,0-10.25h71.62a5.12,5.12,0,1,0,0-10.24H39.71L84.52,92.19h200a5.12,5.12,0,1,0,0-10.24ZM129,68.71q-2.23,3.72-8.53,4.4l3,7.08h-5.68l-3-7a28.36,28.36,0,0,1-13.06-4.74,25.31,25.31,0,0,1-9.3-11.92v-.18h10.19a15.06,15.06,0,0,0,5.13,6.86,11.42,11.42,0,0,0,6.47,2.08c2.17,0,3.59-.58,4.25-1.74s.58-2.71-.25-4.66a11.3,11.3,0,0,0-3.68-4.72,25.68,25.68,0,0,0-7.15-3.4,58.64,58.64,0,0,1-14.53-6.45,22,22,0,0,1-8.11-10q-2.56-6-.36-9.85t8.42-4.52L89.5,12.19h5.69L98.5,20a24.57,24.57,0,0,1,12.12,5.26,27.45,27.45,0,0,1,8.31,11.22l0,.18H108.71a17.15,17.15,0,0,0-4.51-6.51,8.78,8.78,0,0,0-5.71-2.29c-2,0-3.32.6-3.82,1.77s-.33,2.75.5,4.71a10.8,10.8,0,0,0,3.52,4.52,27.11,27.11,0,0,0,7.3,3.41,63.13,63.13,0,0,1,14.54,6.65,21.8,21.8,0,0,1,8,9.91C130.33,62.92,130.47,66.24,129,68.71Z"/>
  </svg>
);

const SushiWeyLogo = ({ className = "h-10 w-auto" }) => (
  <svg className={className} viewBox="0 0 547.77 547.76" xmlns="http://www.w3.org/2000/svg">
    <path fill="#e30d20" d="M273.88,533.79C130.57,533.79,14,417.19,14,273.88S130.57,14,273.88,14s259.91,116.59,259.91,259.9S417.19,533.79,273.88,533.79"/>
    <path fill="#1d1d1c" d="M273.88,28c135.82,0,245.93,110.1,245.93,245.92S409.7,519.81,273.88,519.81,28,409.7,28,273.88,138.06,28,273.88,28m0-28C122.86,0,0,122.86,0,273.88S122.86,547.76,273.88,547.76,547.77,424.9,547.77,273.88,424.9,0,273.88,0"/>
    <path fill="#ffcf00" d="M273.88,486.77C156.49,486.77,61,391.27,61,273.88S156.49,61,273.88,61s212.9,95.5,212.9,212.89-95.51,212.89-212.9,212.89"/>
    <path fill="#f18a32" d="M273.88,74c110.24,0,199.93,89.68,199.93,199.92S384.12,473.8,273.88,473.8,74,384.12,74,273.88,163.64,74,273.88,74m0-25.94C149.34,48,48,149.34,48,273.88S149.34,499.74,273.88,499.74,499.74,398.42,499.74,273.88,398.42,48,273.88,48"/>
    <path fill="#00a7c0" d="M432.11,273.88A162.43,162.43,0,1,1,269.69,111.45,162.42,162.42,0,0,1,432.11,273.88"/>
    <path fill="#1c1c1b" d="M476.23,278a35.34,35.34,0,0,0-13.84-18,29.63,29.63,0,0,0-18.91-4.64,31,31,0,0,0-3.12.57,36.86,36.86,0,0,0,1.1-3.66,26.44,26.44,0,0,0-2.18-17.87c.52-.65,1.07-1.28,1.53-2l.8-1.29a27.31,27.31,0,0,0-2.82-31.42l-1.42-1.7c-.2-.46-.38-1-.6-1.57a70.2,70.2,0,0,1-3.12-13.4,127.24,127.24,0,0,1-1.29-18.48,99.07,99.07,0,0,1,1.34-17.12,26.63,26.63,0,0,0-.78-14.19,69.12,69.12,0,0,0,4.84-8.83l.57-1.34c3.55-9,4.76-16.93,3.74-24.17A33.25,33.25,0,0,0,427.34,75.5,35.61,35.61,0,0,0,410.64,70a39.24,39.24,0,0,0-5.95,0A35.79,35.79,0,0,0,382,80.82a33.34,33.34,0,0,0-8.61,15.45l-1,5.26.35,4a41.16,41.16,0,0,0,1.31,7l.45,1.67.06,0a28.11,28.11,0,0,1,.28,4.46,18.92,18.92,0,0,1-1.1,3.59,38.9,38.9,0,0,0-8.2-.24,37.25,37.25,0,0,0-7.42,1.41c.29-1.73,1.78-9.42.15-17.2-1.24-5.93-6.05-10.07-6.05-10.07a28,28,0,0,0-22-7.9l-2,.24a30.83,30.83,0,0,0-16.14,8.13c-4,3.63-7.23,8.42-9.95,14.65a106.06,106.06,0,0,0-7.34,23.28c-.38,1.83-.67,3.81-1,5.71a65.24,65.24,0,0,0-6.86.22,68.24,68.24,0,0,0-11.51,2,63.36,63.36,0,0,0-24.25,12.43,72.65,72.65,0,0,0-12.35,13.14h-.16a35.68,35.68,0,0,0-13.85,4.31l-1,.56a38.63,38.63,0,0,0-10.49-6,35.68,35.68,0,0,0-3.72-1.16,35.39,35.39,0,0,0-2.69-9.68,37.86,37.86,0,0,0-13.94-16.3,39.89,39.89,0,0,0-17.17-6.21,50.77,50.77,0,0,0-10.7-.32A86.85,86.85,0,0,0,136,140.86a93.75,93.75,0,0,0-38.88,33.56,119.57,119.57,0,0,0-10.63,20,109.19,109.19,0,0,0-6.24,20.33,93.36,93.36,0,0,0-2,18.89c0,1,.05,2,.11,3q-3.06,1.2-6.21,2.34a146.76,146.76,0,0,1-26.43,6.68L19.56,250l6.53,25.7c.17.65.35,1.61.57,2.78a52.28,52.28,0,0,0,3.83,12.12,47.47,47.47,0,0,0,9.05,13.3,40,40,0,0,0,18.79,11,42.56,42.56,0,0,0,15.35,1.33,59.41,59.41,0,0,0,9.42-1.65,86.7,86.7,0,0,0,9.58-3.07,57.91,57.91,0,0,0,2.53,10.86,48.66,48.66,0,0,0,12.73,20.14,44.18,44.18,0,0,0,22.86,11.32,45.12,45.12,0,0,0,12,.52,57.84,57.84,0,0,0,15.43-3.68,81.09,81.09,0,0,0,14.87-7.88,28.23,28.23,0,0,0,3.51,1.88l6.24,2.56,6.14-.54a26.09,26.09,0,0,0,10.69-3.36,46.7,46.7,0,0,1,3.05,5.57A83,83,0,0,1,209,370.71a185,185,0,0,1,.66,49.6l-.14,1.15-.05,6.9s.54,9.55,3.48,16.41c3.25,7.6,10.52,12.5,18.29,14.44a28.1,28.1,0,0,0,9.62.79,33.84,33.84,0,0,0,9.67-2.38c4.84-1.94,9.56-5.2,15-10.42a102.39,102.39,0,0,0,15.14-19.38c1.78-2.87,3.53-5.86,5.22-9a33.09,33.09,0,0,0,5.46,2,42.32,42.32,0,0,0,9.13,1.42l2.74.06,1.6-.14a28.35,28.35,0,0,0,22.37-13.9,42.51,42.51,0,0,0,13.57,6.33c4.9,1.32,16.82,9.6,17.87,16.05a45.45,45.45,0,0,0,4.09,12.69,68.1,68.1,0,0,0,7,11.4A56.32,56.32,0,0,0,382.21,467a45.56,45.56,0,0,0,12.35,5.9,42.59,42.59,0,0,0,16.28,1.74l.33,0a44.91,44.91,0,0,0,17-5.16,50.11,50.11,0,0,0,15.33-12.88c6.23-7.5,11.26-17,15.37-29a276.1,276.1,0,0,0,8.91-33.19c2.41-11.72,4.5-23.83,6.19-36q2.47-17.89,4.66-34.31s.34-4.42.52-6.07c.33-3.26.54-6.95.64-11.17s0-8.49-.35-13A60.09,60.09,0,0,0,476.23,278"/>
    <path fill="#fff" d="M172.35,261.5a24.75,24.75,0,0,0-6.09-3.59,61.4,61.4,0,0,0-7-2.37q6.36-6.64,12.33-11.79t10.8-8.92c3.22-2.51,6-4.54,8.28-6.11l.55-.38c0,2.2.07,4.35,0,6.59q-.09,7.63.08,14.85a133.39,133.39,0,0,0,.95,13.46,40.46,40.46,0,0,0,2.69,10.7c2,3.59,4.3,5.49,6.84,5.7a12.1,12.1,0,0,0,7.57-2.12,20.66,20.66,0,0,0,6.07-6.41,56.28,56.28,0,0,0,5-9.92,114.66,114.66,0,0,0,3.94-12q1.75-6.39,3-12.93c.34,3.46.78,6.87,1.34,10.27a68.73,68.73,0,0,0,2.17,9.42,40.89,40.89,0,0,0,3.21,7.72,13.51,13.51,0,0,0,4.44,5,17.53,17.53,0,0,0,7.87,2.58,14.85,14.85,0,0,0,6.53-1,17.36,17.36,0,0,0,4.93-3.09,15.45,15.45,0,0,0,2.91-3.35,2.19,2.19,0,0,0-.67-3.18q-3.45-2.26-6.71-9.18a95.22,95.22,0,0,1-5.77-16.24,135.3,135.3,0,0,1-3.7-20.08,104.47,104.47,0,0,1-.33-20.71c.08-1.44-.61-2.16-2.09-2.18a10.81,10.81,0,0,0-5.15,1.56,22.4,22.4,0,0,0-5.57,4.32,11.17,11.17,0,0,0-3.16,6.07c-.12.86-.24,1.84-.37,2.93s-.24,2.3-.35,3.64c-.51,2.49-1.07,5.24-1.69,8.23s-1.3,5.93-2.07,8.79a69.05,69.05,0,0,1-2.58,7.86,22.83,22.83,0,0,1-3,5.59c-.67,1-1.29,1.44-1.86,1.29a2.56,2.56,0,0,1-1.5-1.27c-.59-.91-.71-3.09-.33-6.55s.71-7.45,1-12,.42-9.1.29-13.8a30.24,30.24,0,0,0-2.63-12.12,13.72,13.72,0,0,0-7.75-7.13q-5.34-2-15,1.46a7.68,7.68,0,0,0-2,1.42c-.71.66-.76,1.73-.11,3.22a45.93,45.93,0,0,1,2.51,10.74q.79,6.25,1,13.55s0,.06,0,.09l-1.51.93q-5,3.1-11.67,7.63t-14.24,10.28q-7.58,5.75-15,12.51c-.16.28-1,.26-2.49,0s-3-.67-4.53-1.09q2.94-2.9,7.28-8.14t9.09-12q4.74-6.75,9.48-14.49t8.68-15.51c2.09-4.1,3.91-8.06,5.48-11.91a67.47,67.47,0,0,0,3.47-10.85q1.67-7-.22-11.08a14.14,14.14,0,0,0-5.11-6.16,16,16,0,0,0-6.87-2.5,28.59,28.59,0,0,0-5.72-.24,62.16,62.16,0,0,0-21,5.37,69.6,69.6,0,0,0-28.91,24.92,95.75,95.75,0,0,0-8.48,15.91A84.89,84.89,0,0,0,104,219.46a70.58,70.58,0,0,0-1.53,13.77,34.53,34.53,0,0,0,1.37,9.72,22.61,22.61,0,0,0,3.48,7,220.8,220.8,0,0,1-26.95,11.74,170.82,170.82,0,0,1-30.83,7.81c.26,1,.58,2.53,1,4.61a27.72,27.72,0,0,0,2.11,6.52,23.12,23.12,0,0,0,4.48,6.5A16.58,16.58,0,0,0,65,291.6q4.78,1.36,12.08-.49a78.2,78.2,0,0,0,15.77-6.18,179.37,179.37,0,0,0,17.75-10.42q9.26-6.11,18.29-13.31c1.36.23,2.73.51,4.12.85s2.76.61,4.13.83a108.29,108.29,0,0,0-14.22,18.95,45.26,45.26,0,0,0-6.45,19.52,34.39,34.39,0,0,0,1.69,13.27,24.39,24.39,0,0,0,6.38,10.24A20.28,20.28,0,0,0,135.13,330q6.3,1.14,14.35-1.9a56.77,56.77,0,0,0,11.9-6.47A41.34,41.34,0,0,0,171.8,311a47,47,0,0,0,6.65-15.51,59.34,59.34,0,0,0,.78-20.83,19.52,19.52,0,0,0-2.33-7.69,19,19,0,0,0-4.55-5.43m-45.44-22.95q-1.95-7.28,2.51-18.38a120.24,120.24,0,0,1,9.89-19.56,180.9,180.9,0,0,1,12.56-17.87,88.37,88.37,0,0,1,12.31-12.86q5.87-4.84,8.94-4.61,2.74.33,1.17,5.35a70.58,70.58,0,0,1-5.82,12.62q-4.26,7.6-10.34,16.58t-12.18,17q-6.07,8-11.3,14c-3.46,4-6.05,6.58-7.74,7.74m31.85,44.57a48.19,48.19,0,0,1-2.18,10.67,43.32,43.32,0,0,1-7.11,14.12q-4.66,6-9.23,8.14a5.22,5.22,0,0,1-3.31.53,4.53,4.53,0,0,1-2.46-1.56,7.77,7.77,0,0,1-1.52-3,21,21,0,0,1-.64-3.72A42.49,42.49,0,0,1,136.62,287a101.65,101.65,0,0,1,12.86-20.35,18,18,0,0,1,5.27,3.46,12.5,12.5,0,0,1,3.28,5.31,20.58,20.58,0,0,1,.73,7.69"/>
    <path fill="#fff" d="M250.06,217.23a17.17,17.17,0,0,0,4,7.61,18.15,18.15,0,0,0,6.19,4.27,27.27,27.27,0,0,0,7.42,1.91c2.61.3,5.19.53,7.7.67l2.16.13a93.74,93.74,0,0,0-8.89,15.4,30.67,30.67,0,0,0-2.95,15,29.76,29.76,0,0,0,.87,5.25,22.45,22.45,0,0,0,2.91,6.57,18.16,18.16,0,0,0,4.66,4.86,18.16,18.16,0,0,0,6.16,2.5,17.21,17.21,0,0,0,7.4-.47,31,31,0,0,0,5-1.87,27.59,27.59,0,0,0,7.23-6,47.64,47.64,0,0,0,6.73-9.59,43.25,43.25,0,0,0,4.2-11.4,24.29,24.29,0,0,0-.19-11.63,20.57,20.57,0,0,0-4.26-8,25.23,25.23,0,0,0-8.59-6.28q4-5.5,6.47-8.55c1.64-2,3.05-3.71,4.23-5a39.81,39.81,0,0,1,3.5-3.5c.88-.79,2-1.88,3.28-3.12.16,1.64.27,3.36.48,4.94a104.17,104.17,0,0,0,4.15,19.16q2.75,8.2,7.19,11.61a17.32,17.32,0,0,0,6,3.1,18.46,18.46,0,0,0,5.95.71,20.28,20.28,0,0,0,5.39-1,13.09,13.09,0,0,0,4.12-2.16,3.69,3.69,0,0,0,1.76-2.69,9.4,9.4,0,0,0-.23-2.15,56.28,56.28,0,0,1-1.69-11.23,104,104,0,0,1,.14-13.05c.33-4.52.8-9,1.45-13.39s1.39-8.55,2.26-12.38,1.75-7.14,2.65-9.92a23,23,0,0,1,2.66-5.94c.67-1,1.24-1.57,1.67-1.68s.77.09,1,.62a8.29,8.29,0,0,1,.41,2.2,16.36,16.36,0,0,1-.11,3.21q-1.9,24.59-.41,41.44t5.13,27.75q3.63,10.89,8.66,16.44a26.76,26.76,0,0,0,10.34,7.5,20,20,0,0,0,10.14,1.18,20.2,20.2,0,0,0,8-2.85,35.45,35.45,0,0,0,7.6-6.64,45.39,45.39,0,0,0,5.35-7.46,21.45,21.45,0,0,0,2.48-6c.33-1.62.09-2.39-.7-2.29q-9.74,1.37-16.6-2.8A34.26,34.26,0,0,1,389,230.63a64,64,0,0,1-7.16-17.11,160,160,0,0,1-3.94-19.3,173.16,173.16,0,0,1-1.62-18.33c-.2-5.78-.24-10.47-.13-14q0-1.24-.09-3.6a40.27,40.27,0,0,0-.48-4.74,15.12,15.12,0,0,0-1.36-4.41,5.5,5.5,0,0,0-2.78-2.8,13.61,13.61,0,0,0-9.08,1.46,28.8,28.8,0,0,0-7.91,6.45,57,57,0,0,0-6.74,9.59,106.06,106.06,0,0,0-5.36,11c-1.54,3.72-2.9,7.27-4,10.64s-2.08,6.23-2.76,8.54a179.75,179.75,0,0,1-3.77-31.21q-.36-14.6.41-25.6a192.46,192.46,0,0,1,3.2-23.69,3.6,3.6,0,0,0-3.3-1.07,7.45,7.45,0,0,0-3.58,2.11c-1.38,1.26-2.79,3.56-4.26,6.9a84.33,84.33,0,0,0-5.61,18,211.78,211.78,0,0,0-3.41,22.95,234.11,234.11,0,0,0-1,24.89c0,2.66.17,5.15.28,7.7l-1.75,1.36c-2.29,1.8-5,4-8,6.56s-6.25,5.52-9.68,8.79-6.77,6.77-10,10.48a6.88,6.88,0,0,1-1.74.11l-2.49,0a19,19,0,0,1-2.34-.16c-.74-.1-1.23-.18-1.48-.23q-7.74-1.81-9.51-8.42c-.86-3.2-.61-7.33.74-12.42q2.61-10.08,6.33-14.35c2.49-2.85,4.66-4.53,6.53-5a3.93,3.93,0,0,1,4.13.85,3.22,3.22,0,0,1,1.19,1.8q.75,2.81-2.65,8.32t-9.59,16a1.89,1.89,0,0,0-.48,1.55,1.13,1.13,0,0,0,.77.85,3.88,3.88,0,0,0,1.12.24,32,32,0,0,0,5.33.07,28.57,28.57,0,0,0,5.77-.92,25.29,25.29,0,0,0,4.35-1.61,18.86,18.86,0,0,0,3.63-2.3,44.63,44.63,0,0,0,12.53-16c2.56-5.82,3.24-11,2-15.67a13.41,13.41,0,0,0-5-7.34c-2.52-1.92-6-2.93-10.39-3.06a42.6,42.6,0,0,0-12,1.45,39.1,39.1,0,0,0-15,7.65,47.52,47.52,0,0,0-10.53,12.21,50.29,50.29,0,0,0-5.86,14.14,37.46,37.46,0,0,0-1,13.46c.07.68.16,1.37.28,2.05s.26,1.28.41,1.83m29.85,29.17a27,27,0,0,1,3.25-5.38,7.41,7.41,0,0,1,3.66-2.84c2.21-.59,3.86,1.16,4.95,5.23q1,3.79-.17,10a27.66,27.66,0,0,1-2.93,7.25,8.64,8.64,0,0,1-5.29,4.34,2.28,2.28,0,0,1-2-.45,5.81,5.81,0,0,1-1.67-1.94,20.77,20.77,0,0,1-1.18-2.43,16.46,16.46,0,0,1-.72-2,12.19,12.19,0,0,1,.06-5.41,27.07,27.07,0,0,1,2-6.3"/>
    <path fill="#fff" d="M400.6,222.47a20.8,20.8,0,0,0,8.7,1.39,19.32,19.32,0,0,0,7.2-1.84,10.53,10.53,0,0,0,4.14-3.06,3,3,0,0,0-.48-3.76c-2.27-1.87-4.34-5.39-6.18-10.56a93.63,93.63,0,0,1-4.31-18.06,150.74,150.74,0,0,1-1.55-22A123.28,123.28,0,0,1,410,142.33c.32-1.5-.37-2.32-2.06-2.45a13.69,13.69,0,0,0-6.05,1.18,27,27,0,0,0-6.89,4.05,12.28,12.28,0,0,0-4.37,6.13q-1.26,4.59-2.76,12.51a129.68,129.68,0,0,0-2,17.08,105.39,105.39,0,0,0,.71,18.49A43.59,43.59,0,0,0,392.06,216a20.26,20.26,0,0,0,8.54,6.47"/>
    <path fill="#fff" d="M389.17,134.22A3.58,3.58,0,0,0,391,134a84.35,84.35,0,0,0,10-5.36,40.31,40.31,0,0,0,10.74-9.83q4.57-6.64,5-11a8.77,8.77,0,0,0-2.1-7,11.58,11.58,0,0,0-4.89-3,12.29,12.29,0,0,0-5.32-.52A11.75,11.75,0,0,0,399.54,99a9.26,9.26,0,0,0-3.4,3.7,5.08,5.08,0,0,0-.31,1.3,12.07,12.07,0,0,0-.09,2.14c0,.8.05,1.6.07,2.39s.05,1.43.06,1.88a52.29,52.29,0,0,1-1.5,9.37q-1.31,5.27-6.05,11.91a2.27,2.27,0,0,0-.14.94,2.81,2.81,0,0,0,.21,1,1,1,0,0,0,.78.57"/>
    <path fill="#fff" d="M372,292.25a18.22,18.22,0,0,0,6.77.72c1.76-.47,1.56-3.75.93-5.7a51.17,51.17,0,0,0-2.75-5.29,18.92,18.92,0,0,0-5.11-5.53,22.73,22.73,0,0,0-8.42-3.68,29.81,29.81,0,0,0-12.33.21,35.41,35.41,0,0,0-12.9,5.41,60.21,60.21,0,0,0-12.44,11,50.47,50.47,0,0,0-9.41,15.36c-4,10-7.7,27.44-10.7,34.74A67.55,67.55,0,0,0,304,324a59.86,59.86,0,0,0-4.07-11.84,36.39,36.39,0,0,0-5.21-8.25,31.07,31.07,0,0,0-5-4.77,14.4,14.4,0,0,0-5.69-2.37,21.54,21.54,0,0,0-5.45-.22,14.69,14.69,0,0,0-4.8,1.29,14.91,14.91,0,0,0-3.63,2.3,3.92,3.92,0,0,0-1.34,1.95,4,4,0,0,0,0,1.76,157.73,157.73,0,0,1,.3,25.58,93.67,93.67,0,0,1-3.38,18.79,109.65,109.65,0,0,1-5.91,15.57q-3.45,7.29-7.44,16.15a110,110,0,0,0,1.94-13.88,66,66,0,0,0-.26-11.53,85.62,85.62,0,0,0-2.44-12.44q-1.81-6.78-4.81-16.59a82.52,82.52,0,0,0-10.5-22.68,38.89,38.89,0,0,0-15.12-13.48,21.06,21.06,0,0,0-21.34.95,27.63,27.63,0,0,0-7.57,7.07,42.37,42.37,0,0,0-5.08,8.79,36.49,36.49,0,0,0-2.53,8.73,12.68,12.68,0,0,0,.37,6.63,2.93,2.93,0,0,0,1.29.9c.67.29,1.35,0,2.06-.91,2.87-3.36,6-5.13,9.2-5.3a21,21,0,0,1,9.28,1.59,26.35,26.35,0,0,1,10.36,8.29A67.55,67.55,0,0,1,225,339.17a107.69,107.69,0,0,1,8,28.13,215.93,215.93,0,0,1,2.23,27.2,214.58,214.58,0,0,1-1.51,28.73c0,1.18-.05,2.43-.05,3.73,0,1.05.09,2.12.16,3.23a8.66,8.66,0,0,0,.6,2.93l-.12.21a4.32,4.32,0,0,0,2.95,2.4,6.75,6.75,0,0,0,4.26-.61q2.72-1.08,7.08-5.26A79.52,79.52,0,0,0,260.08,415a174.13,174.13,0,0,0,10.81-20.43A248.78,248.78,0,0,0,280,371.24a209.33,209.33,0,0,0,6.51-23.6C288,353.4,289.1,359,290,364.33s2.68,24.7,3,29.56a3.92,3.92,0,0,0,1.64,2.13,9,9,0,0,0,3.12,1.46,18.05,18.05,0,0,0,3.79.58,6.51,6.51,0,0,0,3.37-.64,4.31,4.31,0,0,0,2.07-2.5,242.26,242.26,0,0,0,7.54-26.72c.89-4.56,9.76-41.21,16.56-53.26,14.21-25.19,36.9-23.76,40.87-22.69"/>
    <path fill="#fff" d="M453.4,286.15a11.05,11.05,0,0,0-4.22-5.86c-1.86-1.21-4.31-1.12-7.35.29q-3.1,5.61-6.25,12.38t-6.4,13.75q-3.27,7-6.42,13.67t-6.07,12.07a65.57,65.57,0,0,1-5.44,8.72c-1.71,2.22-3.23,3.52-4.54,3.87-1.13.18-1.66-.53-1.56-2.15a33.89,33.89,0,0,1,1.26-6.53c.74-2.73,1.62-5.84,2.64-9.3s1.87-6.87,2.57-10.24a41.45,41.45,0,0,0,.9-9.54,11.54,11.54,0,0,0-2.36-7.16q-2.24-2.67-7-3T390,300c1.73,2,3.46,10.6.85,19.4a165.59,165.59,0,0,1-10.11,26.09c-1.87,3.57-12.41,25-22.84,27.55a3.68,3.68,0,0,1-1.37.18,5.94,5.94,0,0,1-4.21-2.85,19.66,19.66,0,0,1-2.53-5.78l-.58-2.15a6.45,6.45,0,0,1-.19-2.07q4.83-2.37,10.26-8.59a77.59,77.59,0,0,0,9.56-13.89,73.76,73.76,0,0,0,6.29-15.5q2.14-7.83.74-13.12a9.33,9.33,0,0,0-4.95-6.2q-3.78-1.9-11.14-.28l-.66.18a19.74,19.74,0,0,0-8.65,5.32,50.22,50.22,0,0,0-7.76,10,76.74,76.74,0,0,0-6.21,13.17,96.66,96.66,0,0,0-4.14,14.92,82.46,82.46,0,0,0-1.55,15,49.69,49.69,0,0,0,1.57,13.48,32.24,32.24,0,0,0,2.38,6.26,20.65,20.65,0,0,0,3.7,5.2,18.16,18.16,0,0,0,8.56,4.88A20.85,20.85,0,0,0,358,391a26.88,26.88,0,0,0,8.65-4.08,36.15,36.15,0,0,0,7.16-7.23,100.31,100.31,0,0,0,7.68-11.35c1.28-2.18,2.41-4.62,3.61-6.94a18.47,18.47,0,0,0,2.4,8.25q2.67,4.06,10.17,2.94,4.46-1.2,10.05-8.72a149.61,149.61,0,0,0,11.4-18.27q5.78-10.75,11.36-23t9.89-22.57q-1.21,9.36-3.36,20.47t-5,22.66q-2.85,11.56-6.07,23t-6.42,21.28q-2.08,6.77-5,14a59.23,59.23,0,0,1-7.16,13,30.19,30.19,0,0,1-10.09,8.9q-5.87,3.17-13.9,1.6c-.75-.15-1,.57-.75,2.15a22.43,22.43,0,0,0,2,5.84,44.56,44.56,0,0,0,4.55,7.37,31.33,31.33,0,0,0,6.85,6.75,21.14,21.14,0,0,0,5.77,2.7,18.92,18.92,0,0,0,7.18.73,20.77,20.77,0,0,0,7.92-2.48,26.17,26.17,0,0,0,8-6.91q6.44-7.75,11.1-21.39A251,251,0,0,0,444,389.48q3.42-16.59,5.92-34.42t4.64-34.18c0-.82.15-2.6.43-5.33s.45-5.82.53-9.26a106.33,106.33,0,0,0-.28-10.63,36,36,0,0,0-1.85-9.51M350.78,343.74q1-4.15,2.35-8.07c.9-2.59,1.8-5,2.71-7.09a49.94,49.94,0,0,1,2.67-5.5c1.29-2.23,2.55-3.51,3.76-3.84s2,.29,2.43,1.83a10.68,10.68,0,0,1-.16,4.65,29.15,29.15,0,0,1-2.71,7.09,109.36,109.36,0,0,1-5.63,10,63.1,63.1,0,0,1-6.94,9.12,70.79,70.79,0,0,1,1.52-8.2"/>
  </svg>
);

// --- UI COMPONENTS ---

const SectionHeading = ({ number, title, subtitle }: { number: string; title: string; subtitle: string }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-4">
      <span className="text-[#00B4B9] font-mono text-sm font-bold tracking-widest">{number}</span>
      <div className="h-px w-12 bg-[#00B4B9]/30"></div>
    </div>
    <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-6 uppercase break-words">{title}</h2>
    <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">{subtitle}</p>
  </div>
);

// --- ANIMACIONES CON FRAMER MOTION ---

type MotionDirection = 'left' | 'right' | 'up';

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  return { ref, inView };
};

const getDirectionVariants = (direction: MotionDirection) => {
  const offset = 80;
  switch (direction) {
    case 'left':
      return {
        hidden: { opacity: 0, x: -offset },
        visible: { opacity: 1, x: 0 },
      };
    case 'right':
      return {
        hidden: { opacity: 0, x: offset },
        visible: { opacity: 1, x: 0 },
      };
    default:
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      };
  }
};

const MotionReveal = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: MotionDirection;
}) => {
  const { ref, inView } = useScrollReveal();
  const variants = getDirectionVariants(direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

const FloatPill = ({ children }: { children: ReactNode }) => (
  <motion.div
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00B4B9]/20 bg-[#00B4B9]/5 text-[#00B4B9] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// --- SECTIONS ---

const Navbar = () => (
  <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4">
    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <motion.div
        className="flex items-center gap-4 group cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="inline-flex"
          animate={{ rotate: [0, -5, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CharlideasLogo className="h-10 w-10" />
        </motion.div>
        <div className="flex flex-col">
          <span className="text-white font-black tracking-tighter text-xl leading-none">Charl!deas</span>
          <span className="text-[10px] text-[#00B4B9] font-mono uppercase tracking-[0.2em]">Product Studio</span>
        </div>
      </motion.div>
      <div className="hidden md:flex items-center gap-8">
        {['Proyectos', 'Servicios', 'Método'].map(link => (
          <a key={link} href={`#${link === 'Método' ? 'método' : link.toLowerCase()}`} className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#050505] rounded">
            {link}
          </a>
        ))}
        <button 
          onClick={() => {
            const el = document.getElementById('contacto');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-[#00B4B9] hover:text-white transition-all duration-300"
        >
          Hablemos
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
    <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#00B4B9]/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div className="max-w-7xl mx-auto w-full relative z-10">
      <MotionReveal direction="left">
        <FloatPill>
          Digitalización de negocios · Landings para marcas personales
        </FloatPill>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-[96px] lg:text-[140px] font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-10 uppercase text-left"
          variants={getDirectionVariants('left')}
        >
          DIGITALIZAMOS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-200">TU NEGOCIO</span> <br />
          <span className="text-slate-500">&amp; TU MARCA.</span>
        </motion.h1>
      </MotionReveal>
      <div className="grid md:grid-cols-12 gap-10 items-end">
        <MotionReveal className="md:col-span-6" delay={150} direction="left">
          <p className="text-slate-400 text-xl leading-relaxed font-medium">
            Sistemas web y landing pages para que tus clientes puedan pedir, reservar, pagar o entender qué ofreces sin
            perderse entre formularios eternos ni menús confusos.
          </p>
        </MotionReveal>
        <MotionReveal className="md:col-span-6 flex md:justify-end gap-4" delay={200} direction="right">
          <div className="flex flex-col items-center">
            <div className="h-16 w-px bg-gradient-to-b from-[#00B4B9] to-transparent"></div>
            <span className="text-[#00B4B9] text-[10px] font-mono uppercase tracking-widest rotate-90 mt-12 origin-left tracking-[0.5em]">Explora</span>
          </div>
        </MotionReveal>
      </div>
    </div>
  </section>
);

const ProjectGrid = () => {
  const projects = getFeaturedProjects();

  return (
    <section id="proyectos" className="py-24 sm:py-32 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          number="01" 
          title="Proyectos reales" 
          subtitle="Cuatro casos donde pasamos de una necesidad concreta (pedidos, finanzas, nutrición, foco) a un producto digital que se usa todos los días."
        />
        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
          {projects.map((project, idx) => {
            const isSushiWey = project.id === 'sushiwey';
            const isLukita = project.id === 'lukita';

            const direction: MotionDirection = idx % 2 === 0 ? 'left' : 'right';
            
            const handleCardClick = () => {
              if (project.deployedUrl) {
                window.open(project.deployedUrl, '_blank', 'noopener,noreferrer');
              }
            };

            const handleInnerLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.stopPropagation();
            };

            const isClickable = Boolean(project.deployedUrl);

            return (
              <MotionReveal
                key={project.id}
                delay={idx * 120}
                direction={direction}
              >
                <div
                  className="group relative bg-[#050505] p-10 md:p-14 hover:bg-[#0A0A0A] transition-colors duration-500 cursor-pointer"
                  onClick={handleCardClick}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : -1}
                  onKeyDown={(e) => {
                    if (!isClickable) return;
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick();
                    }
                  }}
                >
                  <motion.div
                    className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100"
                    initial={{ x: 10, y: -10 }}
                    whileHover={{ x: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <ArrowUpRight className="text-[#00B4B9]" size={32} />
                  </motion.div>
                  <p className="text-[#00B4B9] font-mono text-xs mb-4">{String(idx + 1).padStart(2, '0')} — {project.category}</p>
                  <h3 className="text-4xl font-bold text-white mb-6 tracking-tighter uppercase">{project.title}</h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-sm group-hover:text-slate-300 transition-colors">
                    {project.shortDescription}
                  </p>

                  <div className="flex items-center gap-6">
                    <motion.div
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center min-w-[72px] h-[72px]"
                      whileHover={{ scale: 1.08, rotate: -2 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      {isSushiWey ? (
                        <SushiWeyLogo className="h-12 w-auto" />
                      ) : isLukita ? (
                        <LukitaLogo className="h-7 w-auto" />
                      ) : (
                        <img src={project.logo} alt={`Logo de ${project.title}`} className="h-12 w-auto object-contain" loading="lazy" />
                      )}
                    </motion.div>
                    <div className="h-px flex-1 bg-white/10"></div>
                    <div className="flex items-center gap-3">
                      {project.deployedUrl && (
                        <a 
                          href={project.deployedUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={handleInnerLinkClick}
                          className="text-[#00B4B9] hover:text-[#00ffff] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#050505] rounded p-1"
                          aria-label={`Ver ${project.title}`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={handleInnerLinkClick}
                          className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00B4B9] focus:ring-offset-2 focus:ring-offset-[#050505] rounded p-1"
                          aria-label={`Ver código de ${project.title} en GitHub`}
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, items, icon: Icon }: { title: string; items: string[]; icon: LucideIcon }) => (
  <div className="bg-[#0A0A0A] p-10 border border-white/5 rounded-[2rem] hover:border-[#00B4B9]/30 transition-all group">
    <div className="h-14 w-14 rounded-2xl bg-[#00B4B9]/10 flex items-center justify-center text-[#00B4B9] mb-8 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold text-white mb-6 tracking-tight uppercase">{title}</h3>
    <ul className="space-y-4">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex items-center gap-3 text-slate-500 text-sm">
          <CheckCircle2 size={16} className="text-[#00B4B9] shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Services = () => (
  <section id="servicios" className="py-24 sm:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <MotionReveal direction="left">
        <SectionHeading 
          number="02" 
          title="Capacidades" 
          subtitle="Abordamos cada desafío con una visión holística, combinando ingeniería de software, diseño de interfaces y estrategia de negocio."
        />
      </MotionReveal>
      <div className="grid md:grid-cols-3 gap-8">
        <MotionReveal delay={100} direction="left">
          <ServiceCard 
            icon={Code}
            title="Ingeniería Web"
            items={['Web Apps Progresivas', 'Sistemas de Gestión', 'Dashboards de Datos', 'API Development']}
          />
        </MotionReveal>
        <MotionReveal delay={150} direction="up">
          <ServiceCard 
            icon={Layout}
            title="Diseño de Sistemas"
            items={['UX / UI Architecture', 'Diseño de Interacción', 'Identidad Digital', 'Prototipado de Alta']}
          />
        </MotionReveal>
        <MotionReveal delay={200} direction="right">
          <ServiceCard 
            icon={Layers}
            title="Estrategia"
            items={['Auditoría de Producto', 'Escalabilidad Técnica', 'Consultoría Tecnológica', 'Optimización de Flujos']}
          />
        </MotionReveal>
      </div>
    </div>
  </section>
);

const Methodology = () => (
  <section id="método" className="py-32 px-6 bg-[#0A0A0A]">
    <div className="max-w-6xl mx-auto">
      <MotionReveal direction="left">
        <SectionHeading 
          number="03" 
          title="Cómo trabajamos" 
          subtitle="Menos reuniones y más producto: entendemos el negocio, definimos reglas y lanzamos algo que puedas usar rápido."
        />
      </MotionReveal>
      <div className="grid md:grid-cols-2 gap-16">
        <MotionReveal className="space-y-8" delay={100} direction="left">
          <div className="relative pl-12 border-l border-white/10 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border border-[#00B4B9] flex items-center justify-center text-[#00B4B9] font-bold text-sm">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Entender el problema real</h3>
            <p className="text-slate-500">Qué necesitas que pase: más pedidos, más claridad de gastos, mejor seguimiento, una landing que explique bien tu servicio.</p>
          </div>
          <div className="relative pl-12 border-l border-white/10 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border border-[#00B4B9] flex items-center justify-center text-[#00B4B9] font-bold text-sm">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Diseño de reglas y experiencia</h3>
            <p className="text-slate-500">Definimos reglas claras (estados de pedido, flujos de cobro, objetivos) y las bajamos a una interfaz sin manual.</p>
          </div>
        </MotionReveal>
        <MotionReveal className="space-y-8" delay={150} direction="right">
          <div className="relative pl-12 border-l border-white/10 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border border-[#00B4B9] flex items-center justify-center text-[#00B4B9] font-bold text-sm">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tecnología como herramienta</h3>
            <p className="text-slate-500">Elegimos stack por estabilidad y performance, no por moda. Usamos IA donde suma, pero el diseño y la lógica son humanos.</p>
          </div>
          <div className="relative pl-12 border-l border-white/10 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border border-[#00B4B9] flex items-center justify-center text-[#00B4B9] font-bold text-sm">
              4
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Iteración basada en uso</h3>
            <p className="text-slate-500">Lanzamos, medimos qué se usa de verdad y ajustamos a partir de tu operación diaria, no de supuestos.</p>
          </div>
        </MotionReveal>
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });
  
  const sendToWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Más adelante se construirá el mensaje real para WhatsApp usando nombre + descripción de la idea.
    // const message = `Hola Charl!deas, soy ${formData.name}. ${formData.description}`;
    // window.open(`https://wa.me/TUNUMERO?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="contacto" className="py-32 px-6 bg-white rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <MotionReveal direction="left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00B4B9]/10 text-[#00B4B9] text-[10px] font-black uppercase tracking-widest mb-6">
                Hablemos
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tighter mb-8 leading-[0.95] md:leading-[0.9] uppercase">
                ¿LISTO PARA <br /> <span className="text-slate-300 font-bold italic">CONSTRUIR?</span>
              </h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-md">
                Omitamos los correos. Cuéntanos quién eres y qué tienes en mente; el siguiente paso es una línea directa vía WhatsApp.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={150} direction="right">
            <form onSubmit={sendToWhatsApp} className="bg-[#f8f8f8] p-8 md:p-12 rounded-[3rem] border border-black/5 shadow-xl">
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Nombre o empresa
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ej: Juan de SushiWey o Estudio X"
                    className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-xl md:text-2xl font-bold focus:outline-none focus:border-[#00B4B9] transition-colors placeholder:text-slate-300"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Describe tu idea o necesidad
                  </label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Cuéntanos qué quieres digitalizar, qué tipo de landing necesitas o qué problema quieres resolver..."
                    className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-base md:text-lg font-medium focus:outline-none focus:border-[#00B4B9] transition-colors placeholder:text-slate-300 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-black text-white py-6 rounded-2xl flex items-center justify-center gap-4 text-lg font-bold hover:bg-[#00B4B9] transition-all duration-300 group"
                >
                  Preparar mensaje para WhatsApp <MessageCircle className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </form>
          </MotionReveal>
        </div>

      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white py-8 border-t border-black/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
      <div className="flex items-center gap-3 self-start md:self-auto">
        <CharlideasLogo className="h-7 w-7" />
        <span className="text-sm font-bold text-black tracking-tight">Charl!deas</span>
      </div>

      <div className="flex items-center gap-6 text-sm text-slate-600">
        <a href="#" className="hover:text-[#00B4B9] transition-colors">
          LinkedIn
        </a>
        <a href="#" className="hover:text-[#00B4B9] transition-colors">
          GitHub
        </a>
        <a href="#" className="hover:text-[#00B4B9] transition-colors">
          WhatsApp
        </a>
      </div>

      <div className="text-xs text-slate-500 text-center md:text-right">
        © {new Date().getFullYear()} Charl!deas · Desarrollo realizado por Charl!deas
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#00B4B9] selection:text-white">
      <SEO />
      <Navbar />
      <Hero />
      <ProjectGrid />
      <Methodology />
      <Services />
      <ContactSection />
      <Footer />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        
        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3 {
          letter-spacing: -0.05em;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1A1A1A;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #00B4B9;
        }
      `}</style>
    </div>
  );
};

export default App;