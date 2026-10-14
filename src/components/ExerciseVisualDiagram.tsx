import React, { useState } from 'react';
import { Armchair, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Exercise } from '../types';

interface ExerciseVisualDiagramProps {
  exercise: Exercise;
  defaultToAccessible?: boolean;
}

export const ExerciseVisualDiagram: React.FC<ExerciseVisualDiagramProps> = ({
  exercise,
  defaultToAccessible = false,
}) => {
  const [viewMode, setViewMode] = useState<'standard' | 'accessible'>(
    defaultToAccessible ? 'accessible' : 'standard'
  );

  const alt = exercise.accessibleAlternative;

  // Render dedicated SVG vector illustration based on diagramType and viewMode
  const renderSvgFigure = () => {
    const isAlt = viewMode === 'accessible';

    switch (exercise.diagramType) {
      case 'press':
      case 'wall':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />
            
            {isAlt ? (
              // Wall Push-Up / Seated Chair Press Diagram (Accessible / Elderly)
              <g>
                {/* Solid green wall */}
                <rect x="40" y="20" width="10" height="130" fill="#059669" rx="3" />
                <text x="45" y="15" fill="#059669" fontSize="10" fontWeight="900" textAnchor="middle">WALL</text>

                {/* Figure 1: Start (Arms Extended) */}
                <circle cx="130" cy="50" r="11" fill="#db2777" />
                <line x1="130" y1="61" x2="145" y2="115" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="135" y1="75" x2="50" y2="75" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                <line x1="145" y1="115" x2="165" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <circle cx="50" cy="75" r="5" fill="#059669" />

                {/* Motion arrow */}
                <path d="M 130 90 L 95 90" stroke="#db2777" strokeWidth="3" fill="none" />
                <polygon points="90,90 98,86 98,94" fill="#db2777" />

                {/* Figure 2: Finish (Elbows Bent, Chest to Wall) */}
                <circle cx="85" cy="50" r="11" fill="#059669" />
                <line x1="85" y1="61" x2="100" y2="115" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <polyline points="90,75 70,88 50,75" stroke="#db2777" strokeWidth="4" fill="none" strokeLinecap="round" />
                <line x1="100" y1="115" x2="120" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Explanatory callouts */}
                <text x="135" y="165" fill="#52525b" fontSize="10" textAnchor="middle" fontWeight="bold">1. Arms Extended</text>
                <text x="75" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">2. Soft Elbow Bend</text>
                <rect x="210" y="40" width="115" height="55" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
                <text x="220" y="58" fill="#065f46" fontSize="9" fontWeight="900">ELDERLY CUE:</text>
                <text x="220" y="72" fill="#047857" fontSize="8.5" fontWeight="bold">Zero floor pressure</text>
                <text x="220" y="85" fill="#047857" fontSize="8.5" fontWeight="bold">Adjust feet closer for ease</text>
              </g>
            ) : (
              // Standard Bench Press / Push-up Diagram
              <g>
                {/* Solid bench base */}
                <rect x="50" y="115" width="170" height="9" rx="3" fill="#71717a" />
                <line x1="70" y1="124" x2="70" y2="150" stroke="#71717a" strokeWidth="4.5" />
                <line x1="200" y1="124" x2="200" y2="150" stroke="#71717a" strokeWidth="4.5" />

                {/* Torso lying on bench */}
                <circle cx="75" cy="105" r="10" fill="#db2777" />
                <line x1="85" y1="110" x2="170" y2="110" stroke="#18181b" strokeWidth="5.5" strokeLinecap="round" />
                <line x1="170" y1="110" x2="185" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Arms pressing barbell */}
                <polyline points="110,110 110,70" stroke="#059669" strokeWidth="4.5" strokeLinecap="round" />
                {/* Barbell and plates */}
                <line x1="85" y1="70" x2="135" y2="70" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />
                <circle cx="85" cy="70" r="7" fill="#18181b" />
                <circle cx="135" cy="70" r="7" fill="#18181b" />

                {/* Movement arrow */}
                <path d="M 150 95 L 150 75" stroke="#059669" strokeWidth="3" fill="none" />
                <polygon points="150,70 145,78 155,78" fill="#059669" />

                <text x="145" y="50" fill="#18181b" fontSize="11" fontWeight="900">Barbell Travel Line</text>
                <text x="135" y="165" fill="#71717a" fontSize="10" textAnchor="middle" fontWeight="bold">Drive Through Chest • Scapulae Retracted</text>
              </g>
            )}
          </svg>
        );

      case 'squat':
      case 'chair':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Chair Sit-to-Stand / Seated Knee Extensions
              <g>
                {/* Solid Chair illustration */}
                <rect x="65" y="95" width="45" height="7" rx="2" fill="#059669" />
                <line x1="70" y1="102" x2="70" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="105" y1="102" x2="105" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="70" y1="102" x2="70" y2="55" stroke="#059669" strokeWidth="4.5" />
                <text x="50" y="70" fill="#059669" fontSize="10" fontWeight="900">CHAIR</text>

                {/* Seated Person (Start) */}
                <circle cx="90" cy="58" r="10" fill="#db2777" />
                <line x1="90" y1="68" x2="90" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="90" y1="95" x2="120" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="120" y1="95" x2="120" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Arc arrow: Standing up */}
                <path d="M 125 80 Q 160 50 195 70" stroke="#059669" strokeWidth="3" fill="none" strokeDasharray="4" />
                <polygon points="200,73 192,67 195,77" fill="#059669" />

                {/* Standing Person (Finish) */}
                <circle cx="225" cy="42" r="10" fill="#059669" />
                <line x1="225" y1="52" x2="225" y2="100" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="225" y1="100" x2="225" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                <text x="90" y="165" fill="#71717a" fontSize="10" textAnchor="middle" fontWeight="bold">1. Sit Tall on Chair</text>
                <text x="225" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">2. Stand Controlled</text>

                <rect x="235" y="40" width="95" height="50" rx="8" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
                <text x="245" y="58" fill="#065f46" fontSize="9" fontWeight="900">SAFETY CUE:</text>
                <text x="245" y="72" fill="#047857" fontSize="8.5" fontWeight="bold">Chair provides safety</text>
                <text x="245" y="83" fill="#047857" fontSize="8.5" fontWeight="bold">Zero fall risk</text>
              </g>
            ) : (
              // Standard Squat
              <g>
                {/* Standing Squat start */}
                <circle cx="85" cy="42" r="10" fill="#db2777" />
                <line x1="85" y1="52" x2="85" y2="100" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="85" y1="100" x2="85" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Transition Arrow */}
                <path d="M 120 80 L 160 80" stroke="#059669" strokeWidth="3" fill="none" />
                <polygon points="166,80 158,75 158,85" fill="#059669" />

                {/* Squat depth */}
                <circle cx="205" cy="72" r="10" fill="#059669" />
                <line x1="205" y1="82" x2="200" y2="115" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="200" y1="115" x2="235" y2="115" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />
                <line x1="235" y1="115" x2="235" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                <text x="85" y="165" fill="#71717a" fontSize="10" textAnchor="middle" fontWeight="bold">1. Stance Ready</text>
                <text x="215" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">2. Thighs Parallel (Hips Back)</text>
              </g>
            )}
          </svg>
        );

      case 'pull':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Seated Towel / Door Row (Accessible / Elderly)
              <g>
                {/* Sturdy Chair */}
                <rect x="200" y="95" width="40" height="7" rx="2" fill="#059669" />
                <line x1="205" y1="102" x2="205" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="235" y1="102" x2="235" y2="150" stroke="#059669" strokeWidth="4.5" />

                {/* Person seated */}
                <circle cx="215" cy="58" r="10" fill="#db2777" />
                <line x1="215" y1="68" x2="215" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="215" y1="95" x2="180" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="180" y1="95" x2="180" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Door Post anchor */}
                <line x1="60" y1="20" x2="60" y2="150" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
                <text x="60" y="15" fill="#71717a" fontSize="10" textAnchor="middle" fontWeight="900">DOOR FRAME</text>

                {/* Bath Towel / Resistance Strap */}
                <line x1="60" y1="80" x2="190" y2="80" stroke="#db2777" strokeWidth="4" strokeDasharray="4" />
                {/* Pull motion arrow */}
                <path d="M 150 72 L 180 72" stroke="#059669" strokeWidth="3" fill="none" />
                <polygon points="186,72 178,67 178,77" fill="#059669" />

                <text x="215" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">Drive Elbows Back • Squeeze Shoulder Blades</text>
              </g>
            ) : (
              // Standard Deadlift / Barbell Pull posture
              <g>
                <circle cx="110" cy="50" r="10" fill="#db2777" />
                {/* Flat back hinge line */}
                <line x1="110" y1="60" x2="150" y2="98" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                <line x1="150" y1="98" x2="135" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                {/* Arms straight down holding bar */}
                <line x1="120" y1="70" x2="148" y2="125" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
                <circle cx="148" cy="125" r="9" fill="#db2777" />

                {/* Straight spine cue */}
                <line x1="100" y1="50" x2="160" y2="108" stroke="#059669" strokeWidth="2" strokeDasharray="3" />
                <text x="180" y="70" fill="#059669" fontSize="10" fontWeight="900">Flat Spine Cue</text>
                <text x="160" y="165" fill="#18181b" fontSize="10" textAnchor="middle" fontWeight="bold">Hips Back • Core Braced • Bar Close</text>
              </g>
            )}
          </svg>
        );

      case 'hinge':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Supported Chair Hip Hinge (Elderly Safe Hips & Glutes)
              <g>
                {/* Sturdy Chair backrest support */}
                <line x1="80" y1="70" x2="80" y2="150" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                <line x1="55" y1="105" x2="80" y2="105" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                <text x="75" y="60" fill="#059669" fontSize="10" fontWeight="900" textAnchor="middle">CHAIR BACK</text>

                {/* Person holding chair back, hinging hips */}
                <circle cx="170" cy="65" r="10" fill="#db2777" />
                <line x1="170" y1="75" x2="145" y2="105" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                {/* Hands lightly holding chair */}
                <line x1="160" y1="80" x2="80" y2="75" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="80" cy="75" r="5" fill="#059669" />
                {/* Soft knees and hips pushing back */}
                <line x1="145" y1="105" x2="155" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Hip push arrow */}
                <path d="M 135 105 L 115 105" stroke="#db2777" strokeWidth="3" fill="none" />
                <polygon points="110,105 118,100 118,110" fill="#db2777" />

                <text x="170" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">
                  Hold Chair • Push Hips Back • Feel Gentle Hamstring Stretch
                </text>
              </g>
            ) : (
              // Romanian Deadlift (Standard)
              <g>
                <circle cx="120" cy="55" r="10" fill="#db2777" />
                <line x1="120" y1="65" x2="160" y2="100" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                <line x1="160" y1="100" x2="150" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="130" y1="75" x2="145" y2="120" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
                <circle cx="145" cy="120" r="8" fill="#db2777" />

                <text x="160" y="165" fill="#18181b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Knees Slightly Soft • Back Flat • Dumbbells Glide Down Shins
                </text>
              </g>
            )}
          </svg>
        );

      case 'curl':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Seated Water Bottle / Soup Can Curls (Accessible / Senior)
              <g>
                {/* Chair */}
                <rect x="120" y="95" width="45" height="7" rx="2" fill="#059669" />
                <line x1="125" y1="102" x2="125" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="160" y1="102" x2="160" y2="150" stroke="#059669" strokeWidth="4.5" />

                {/* Seated Person */}
                <circle cx="140" cy="55" r="10" fill="#db2777" />
                <line x1="140" y1="65" x2="140" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="140" y1="95" x2="170" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="170" y1="95" x2="170" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Left arm: extended down with water bottle */}
                <line x1="140" y1="70" x2="125" y2="105" stroke="#18181b" strokeWidth="4" strokeLinecap="round" />
                <rect x="120" y="105" width="10" height="15" rx="3" fill="#059669" />

                {/* Right arm: curled up with water bottle */}
                <polyline points="140,70 160,85 155,65" stroke="#db2777" strokeWidth="4" fill="none" strokeLinecap="round" />
                <rect x="150" y="55" width="10" height="15" rx="3" fill="#db2777" />

                {/* Motion arrow */}
                <path d="M 130 95 Q 145 80 152 70" stroke="#059669" strokeWidth="3" fill="none" />
                <polygon points="155,67 147,69 150,77" fill="#059669" />

                <text x="170" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">
                  Comfortably Seated • Use Water Bottles or Soup Cans (0.5–1kg)
                </text>
              </g>
            ) : (
              // Standing Barbell Bicep Curl
              <g>
                <circle cx="130" cy="42" r="10" fill="#db2777" />
                <line x1="130" y1="52" x2="130" y2="100" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="130" y1="100" x2="130" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Curled arms holding bar */}
                <polyline points="130,65 145,85 135,62" stroke="#059669" strokeWidth="4" fill="none" strokeLinecap="round" />
                <line x1="120" y1="62" x2="150" y2="62" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />
                <circle cx="120" cy="62" r="6" fill="#18181b" />
                <circle cx="150" cy="62" r="6" fill="#18181b" />

                <text x="170" y="165" fill="#18181b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Elbows Tucked by Ribs • Squeeze Biceps at Peak
                </text>
              </g>
            )}
          </svg>
        );

      case 'core':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Seated Chair Knee-Lifts / Torso Twists (Zero Floor, Wheelchair Friendly)
              <g>
                {/* Chair */}
                <rect x="130" y="95" width="45" height="7" rx="2" fill="#059669" />
                <line x1="135" y1="102" x2="135" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="170" y1="102" x2="170" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="135" y1="102" x2="135" y2="55" stroke="#059669" strokeWidth="4.5" />

                {/* Seated Person */}
                <circle cx="150" cy="55" r="10" fill="#db2777" />
                <line x1="150" y1="65" x2="150" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                {/* Left foot flat */}
                <line x1="150" y1="95" x2="180" y2="95" stroke="#71717a" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="180" y1="95" x2="180" y2="150" stroke="#71717a" strokeWidth="3.5" strokeLinecap="round" />

                {/* Right knee elevated (Active core pull) */}
                <polyline points="150,95 175,75 195,110" stroke="#db2777" strokeWidth="4.5" fill="none" strokeLinecap="round" />

                {/* Upward motion arrow */}
                <path d="M 180 115 L 180 85" stroke="#059669" strokeWidth="3" fill="none" />
                <polygon points="180,80 175,88 185,88" fill="#059669" />

                <text x="170" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">
                  Seated Knee Lift: Engage Lower Abs • Zero Floor Laying or Neck Strain
                </text>
              </g>
            ) : (
              // Standard Floor Plank / Crunch
              <g>
                <circle cx="90" cy="115" r="9" fill="#db2777" />
                {/* Straight plank body line */}
                <line x1="99" y1="120" x2="220" y2="135" stroke="#059669" strokeWidth="5.5" strokeLinecap="round" />
                {/* Forearms on ground */}
                <line x1="120" y1="123" x2="120" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                {/* Toes on ground */}
                <circle cx="225" cy="140" r="5" fill="#18181b" />

                <text x="160" y="165" fill="#18181b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Straight Line Head to Heels • Glutes Tight • Core Braced
                </text>
              </g>
            )}
          </svg>
        );

      case 'raise':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Seated Water-Bottle Lateral Raise / Wall Angels (Accessible)
              <g>
                {/* Chair */}
                <rect x="130" y="95" width="45" height="7" rx="2" fill="#059669" />
                <line x1="135" y1="102" x2="135" y2="150" stroke="#059669" strokeWidth="4.5" />
                <line x1="170" y1="102" x2="170" y2="150" stroke="#059669" strokeWidth="4.5" />

                {/* Person */}
                <circle cx="152" cy="50" r="10" fill="#db2777" />
                <line x1="152" y1="60" x2="152" y2="95" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="152" y1="95" x2="152" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Arms raised out horizontally with light household items */}
                <line x1="152" y1="65" x2="105" y2="65" stroke="#db2777" strokeWidth="4" strokeLinecap="round" />
                <circle cx="102" cy="65" r="5" fill="#059669" />
                <line x1="152" y1="65" x2="200" y2="65" stroke="#db2777" strokeWidth="4" strokeLinecap="round" />
                <circle cx="203" cy="65" r="5" fill="#059669" />

                {/* Arc arrows */}
                <path d="M 115 85 Q 105 75 105 68" stroke="#059669" strokeWidth="2.5" fill="none" />
                <path d="M 190 85 Q 200 75 200 68" stroke="#059669" strokeWidth="2.5" fill="none" />

                <text x="155" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">
                  Seated Lateral Raise • Raise to Shoulder Height • Slow & Smooth
                </text>
              </g>
            ) : (
              // Standing Overhead Barbell Press
              <g>
                <circle cx="150" cy="55" r="10" fill="#db2777" />
                <line x1="150" y1="65" x2="150" y2="105" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="150" y1="105" x2="150" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Arms pressing up overhead */}
                <polyline points="150,70 140,40 140,25" stroke="#059669" strokeWidth="4" fill="none" strokeLinecap="round" />
                <polyline points="150,70 160,40 160,25" stroke="#059669" strokeWidth="4" fill="none" strokeLinecap="round" />
                <line x1="120" y1="25" x2="180" y2="25" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />

                <text x="150" y="165" fill="#18181b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Lockout Overhead • Squeeze Core & Glutes • Neutral Neck
                </text>
              </g>
            )}
          </svg>
        );

      case 'bridge':
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />

            {isAlt ? (
              // Bed or Mat Gentle Glute Bridge with Cushion (Accessible / Senior)
              <g>
                {/* Soft bed / mat base */}
                <rect x="50" y="140" width="240" height="10" rx="3" fill="#e4e4e7" stroke="#a1a1aa" />
                <text x="250" y="135" fill="#71717a" fontSize="9" fontWeight="bold">BED / MAT</text>

                {/* Head & shoulders flat */}
                <circle cx="80" cy="132" r="10" fill="#db2777" />
                <line x1="90" y1="135" x2="120" y2="135" stroke="#18181b" strokeWidth="5" strokeLinecap="round" />

                {/* Pelvis elevated */}
                <line x1="120" y1="135" x2="160" y2="105" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                {/* Thighs and knees */}
                <line x1="160" y1="105" x2="200" y2="105" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                {/* Feet flat */}
                <line x1="200" y1="105" x2="200" y2="140" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />

                {/* Soft pillow between knees optional support */}
                <rect x="185" y="98" width="12" height="14" rx="3" fill="#db2777" />

                {/* Upward motion arrow */}
                <path d="M 160 128 L 160 110" stroke="#db2777" strokeWidth="3" fill="none" />
                <polygon points="160,105 155,113 165,113" fill="#db2777" />

                <text x="170" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">
                  Can Be Performed on Firm Bed • Gentle Pelvic Lift • Zero Spinal Compaction
                </text>
              </g>
            ) : (
              // Heavy Barbell Hip Thrust
              <g>
                <rect x="70" y="115" width="45" height="35" rx="3" fill="#71717a" />
                <text x="92" y="135" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">BENCH</text>

                <circle cx="85" cy="105" r="9" fill="#db2777" />
                <line x1="95" y1="115" x2="150" y2="115" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                <line x1="150" y1="115" x2="190" y2="115" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                <line x1="190" y1="115" x2="190" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="135" y1="115" x2="165" y2="115" stroke="#db2777" strokeWidth="6" strokeLinecap="round" />

                <text x="160" y="165" fill="#18181b" fontSize="10" textAnchor="middle" fontWeight="bold">
                  Shoulders Pivoted on Bench • Full Glute Contraction
                </text>
              </g>
            )}
          </svg>
        );

      default:
        // Universal Movement Figure
        return (
          <svg viewBox="0 0 340 180" className="w-full h-full max-h-48" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="150" x2="320" y2="150" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4" />
            <circle cx="170" cy="55" r="11" fill="#db2777" />
            <line x1="170" y1="66" x2="170" y2="110" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="170" y1="110" x2="155" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="170" y1="110" x2="185" y2="150" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" />
            <polyline points="150,85 170,75 190,85" stroke="#059669" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="170" y="165" fill="#059669" fontSize="10" textAnchor="middle" fontWeight="900">
              {exercise.name} • Controlled Tempo & Alignment
            </text>
          </svg>
        );
    }
  };

  return (
    <div className="bg-white border-2 border-zinc-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Interactive Mode Toggle Bar (Solid Colors) */}
      <div className="bg-zinc-50 border-b-2 border-zinc-200 p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-700 px-2 flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Visual Technique Demonstration</span>
        </span>

        <div className="flex space-x-1.5 bg-zinc-200 p-1 rounded-xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setViewMode('standard')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              viewMode === 'standard'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-zinc-700 hover:text-zinc-900'
            }`}
          >
            Standard Gym / Full Form
          </button>
          <button
            type="button"
            onClick={() => setViewMode('accessible')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center justify-center space-x-1 ${
              viewMode === 'accessible'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-800 hover:text-emerald-950 font-bold'
            }`}
          >
            <Armchair className="w-3.5 h-3.5" />
            <span>Accessible / Elderly Household Mod</span>
          </button>
        </div>
      </div>

      {/* SVG Figure Illustration Canvas (Crisp Solid Rendering) */}
      <div className="p-4 bg-zinc-50/50 flex items-center justify-center min-h-[170px]">
        {renderSvgFigure()}
      </div>

      {/* Adaptive Household / Non-Equipment Breakdown Banner (Solid Colors) */}
      <div className={`p-4 border-t-2 ${viewMode === 'accessible' ? 'bg-emerald-50 border-emerald-300' : 'bg-pink-50 border-pink-200'}`}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${viewMode === 'accessible' ? 'bg-emerald-600' : 'bg-pink-600'}`} />
              <h4 className="font-black text-sm sm:text-base text-zinc-900">
                {viewMode === 'accessible' ? alt.title : exercise.name}
              </h4>
              {viewMode === 'accessible' && (
                <span className="text-[11px] font-black bg-white text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300 shadow-2xs">
                  Household Item: {alt.householdItem}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-700 mt-1 leading-relaxed font-medium">
              {viewMode === 'accessible' ? alt.targetAdaptation : exercise.tips[0]}
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5">
            {alt.isSeatedOrWheelchairFriendly && (
              <span className="text-[10px] font-black bg-white text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-2xs">
                <Armchair className="w-3 h-3 text-emerald-600" />
                <span>Wheelchair / Chair Ready</span>
              </span>
            )}
            {alt.isLowImpact && (
              <span className="text-[10px] font-black bg-white text-pink-700 border border-pink-300 px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-pink-600" />
                <span>Zero Joint / Spine Strain</span>
              </span>
            )}
            <span className="text-[10px] font-bold bg-white text-zinc-700 border border-zinc-200 px-2 py-0.5 rounded-md flex items-center space-x-1 shadow-2xs">
              <HeartHandshake className="w-3 h-3 text-emerald-600" />
              <span>Senior Fall-Safe</span>
            </span>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mt-3.5 pt-3 border-t border-zinc-200 space-y-2">
          <span className="text-[11px] font-black text-zinc-800 uppercase tracking-wider block">
            {viewMode === 'accessible' ? 'Elderly & Low-Impact Steps:' : 'Standard Form Execution:'}
          </span>
          <ul className="text-xs text-zinc-800 space-y-1.5 font-medium">
            {(viewMode === 'accessible' ? alt.instructions : exercise.instructions).map((step, sIdx) => (
              <li key={sIdx} className="flex items-start space-x-2">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${viewMode === 'accessible' ? 'text-emerald-600' : 'text-pink-600'}`} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
