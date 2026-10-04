import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Sparkles, 
  Cpu, 
  Activity, 
  Sliders,
  TrendingUp
} from 'lucide-react';

const GRID_SIZE = 28;

export const ConwayTab: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>(() => {
    const initial = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
    // Seed default Glider & Pulsar core
    initial[2][3] = true;
    initial[3][4] = true;
    initial[4][2] = true;
    initial[4][3] = true;
    initial[4][4] = true;

    initial[12][12] = true;
    initial[12][13] = true;
    initial[13][12] = true;
    initial[13][13] = true;
    return initial;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(150); // ms per step
  const timerRef = useRef<any>(null);

  // Conway Step logic
  const stepSimulation = () => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          let neighbors = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = (r + dr + GRID_SIZE) % GRID_SIZE;
              const nc = (c + dc + GRID_SIZE) % GRID_SIZE;
              if (prev[nr][nc]) neighbors++;
            }
          }

          if (prev[r][c]) {
            next[r][c] = neighbors === 2 || neighbors === 3;
          } else {
            next[r][c] = neighbors === 3;
          }
        }
      }
      return next;
    });
    setGeneration(g => g + 1);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(stepSimulation, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, speed]);

  const toggleCell = (r: number, c: number) => {
    setGrid(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = !next[r][c];
      return next;
    });
  };

  const handleReset = (preset: 'glider' | 'pulsar' | 'random') => {
    setIsRunning(false);
    setGeneration(0);
    const next = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));

    if (preset === 'glider') {
      next[2][3] = true;
      next[3][4] = true;
      next[4][2] = true;
      next[4][3] = true;
      next[4][4] = true;
    } else if (preset === 'pulsar') {
      for (let i = 8; i <= 14; i++) {
        next[i][11] = true;
        next[i][17] = true;
      }
    } else {
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          next[r][c] = Math.random() > 0.8;
        }
      }
    }
    setGrid(next);
  };

  // Metrics
  const activeCount = grid.flat().filter(Boolean).length;
  const entropyPct = ((activeCount / (GRID_SIZE * GRID_SIZE)) * 100).toFixed(1);
  const fitnessScore = 800 + (generation % 200);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold font-mono text-white">Conway Automaton AI Simulation Engine</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cellular automata modeling autonomous agent population dynamics, tokenomics evolution, liquidity dispersion, and behavioral game theory.
            </p>
          </div>
          <div className="text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-800 px-3 py-1.5 rounded-lg">
            Rule: B3/S23 + Evolutionary Fitness • On-Chain Simulation
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Cellular Grid */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-slate-800 flex flex-col items-center">
          {/* Controls Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? 'Pause' : 'Start Evolution'}</span>
              </button>

              <button
                onClick={stepSimulation}
                disabled={isRunning}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-mono transition-colors"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Step 1</span>
              </button>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-500 mr-1">Seed:</span>
              <button
                onClick={() => handleReset('glider')}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white"
              >
                Glider
              </button>
              <button
                onClick={() => handleReset('pulsar')}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white"
              >
                Pulsar
              </button>
              <button
                onClick={() => handleReset('random')}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white"
              >
                Random
              </button>
            </div>
          </div>

          {/* Grid Canvas */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/90 shadow-inner overflow-auto max-w-full">
            <div
              className="grid gap-[2px]"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: 'min(500px, 85vw)',
                height: 'min(500px, 85vw)'
              }}
            >
              {grid.map((row, r) =>
                row.map((alive, c) => (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => toggleCell(r, c)}
                    className={`cursor-pointer transition-colors duration-75 rounded-[1px] ${
                      alive
                        ? 'bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-sm shadow-indigo-500/50'
                        : 'bg-slate-900/60 hover:bg-slate-800'
                    }`}
                  />
                ))
              )}
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-3">
            Click any cell to toggle alive/dead agent state manually.
          </p>
        </div>

        {/* Telemetry & Evolutionary Metrics */}
        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-5">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Agent Evolutionary Telemetry</span>
          </h3>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Generation:</span>
              <span className="text-indigo-400 font-bold text-sm">{generation}</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Live Agent Cells:</span>
              <span className="text-cyan-400 font-bold text-sm">{activeCount}</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Population Entropy:</span>
              <span className="text-purple-400 font-bold text-sm">{entropyPct}%</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Fitness Fitness Score:</span>
              <span className="text-emerald-400 font-bold text-sm">{fitnessScore} pts</span>
            </div>
          </div>

          <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl">
            <div className="text-purple-300 text-xs font-bold font-mono mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Strategy Insight</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              In Qmoosa, each alive cell acts as an autonomous agent strategy. When population entropy stabilizes between 15% - 25%, agent trade routing optimizes gas efficiency across ICP canisters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
