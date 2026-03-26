import React, { useState } from 'react';
import type { SimulationScenario, SimulationStep, Translations } from '@peopleseyes/core-i18n';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SimulationSelectorProps {
  t: Translations;
  onSelect: (scenarioId: string) => void;
  onClose: () => void;
}

interface SimulationRunnerProps {
  scenario: SimulationScenario;
  t: Translations;
  onFinish: () => void;
}

// ─── SimulationSelector ───────────────────────────────────────────────────────

function SimulationSelector({ t, onSelect, onClose }: SimulationSelectorProps) {
  const sim = t.simulations;
  const scenarioList: SimulationScenario[] = [
    sim.scenarios.identityCheck,
    sim.scenarios.houseSearch,
    sim.scenarios.arrest,
    sim.scenarios.vehicleStop,
  ];

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-slate-100">{sim.title}</h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
        >
          ✕
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-6">{sim.subtitle}</p>
      <div className="grid grid-cols-2 gap-3">
        {scenarioList.map(scenario => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
            className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition-colors"
          >
            <div className="text-3xl mb-2">{scenario.icon}</div>
            <div className="text-sm font-medium text-slate-200 mb-1">{scenario.title}</div>
            <div className="text-xs text-slate-500 leading-relaxed">{scenario.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SimulationRunner ─────────────────────────────────────────────────────────

function SimulationRunner({ scenario, t, onFinish }: SimulationRunnerProps) {
  const sim = t.simulations;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const step: SimulationStep | undefined = scenario.steps[currentStep];
  if (!step) return null;
  const isLastStep = currentStep === scenario.steps.length - 1;
  const isDone = answers.length === scenario.steps.length;
  const score = answers.filter(Boolean).length;

  function handleChoice(choiceId: string, isCorrect: boolean) {
    if (showFeedback) return;
    setSelectedChoice(choiceId);
    setShowFeedback(true);
    setAnswers(prev => [...prev, isCorrect]);
  }

  function handleNext() {
    if (isLastStep) {
      // summary wird automatisch angezeigt
    } else {
      setCurrentStep(s => s + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    }
  }

  // Score-Summary nach letztem Schritt
  if (isDone) {
    return (
      <div className="px-4 pt-6 pb-8 max-w-lg mx-auto flex flex-col items-center text-center gap-4">
        <div className="text-5xl">{scenario.icon}</div>
        <h2 className="text-lg font-medium text-slate-100">{scenario.title}</h2>
        <div className="bg-slate-800 rounded-xl p-6 w-full space-y-3">
          <div className="text-3xl font-bold text-slate-100">{score}/{scenario.steps.length}</div>
          <div className="flex gap-2 justify-center">
            {answers.map((correct, i) => (
              <span
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  correct ? 'bg-green-600/30 text-green-400' : 'bg-red-600/30 text-red-400'
                }`}
              >
                {correct ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => {
              setCurrentStep(0);
              setAnswers([]);
              setSelectedChoice(null);
              setShowFeedback(false);
            }}
            className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-sm font-medium transition-colors"
          >
            {sim.restart}
          </button>
          <button
            onClick={onFinish}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
          >
            {sim.finish}
          </button>
        </div>
      </div>
    );
  }

  const selectedChoiceData = showFeedback
    ? step.choices.find(c => c.id === selectedChoice)
    : null;

  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{scenario.icon}</span>
        <div>
          <h2 className="text-sm font-medium text-slate-200">{scenario.title}</h2>
          <div className="flex gap-1 mt-1">
            {scenario.steps.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < currentStep
                    ? 'bg-blue-500'
                    : i === currentStep
                    ? 'bg-slate-300'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Situation */}
      <div className="bg-slate-900 rounded-xl p-4">
        <p className="text-xs text-slate-500 italic leading-relaxed">{step.situation}</p>
      </div>

      {/* Frage */}
      <p className="text-sm font-medium text-slate-100">{step.question}</p>

      {/* Antwortoptionen */}
      <div className="space-y-2">
        {step.choices.map(choice => {
          const isSelected = selectedChoice === choice.id;
          const isRevealed = showFeedback;

          let btnClass = 'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ';
          if (!isRevealed) {
            btnClass += 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800';
          } else if (choice.isCorrect) {
            btnClass += 'border-green-600 bg-green-600/15 text-green-300';
          } else if (isSelected && !choice.isCorrect) {
            btnClass += 'border-red-600 bg-red-600/15 text-red-300';
          } else {
            btnClass += 'border-slate-800 text-slate-600';
          }

          return (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.id, choice.isCorrect)}
              disabled={isRevealed}
              className={btnClass}
            >
              <span className="leading-relaxed">{choice.text}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && selectedChoiceData && (
        <div
          className={`rounded-xl p-4 space-y-1 transition-opacity duration-300 opacity-100 ${
            selectedChoiceData.isCorrect
              ? 'bg-green-600/10 border border-green-700/40'
              : 'bg-red-600/10 border border-red-700/40'
          }`}
        >
          <p
            className={`text-xs font-semibold ${
              selectedChoiceData.isCorrect ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {selectedChoiceData.isCorrect ? sim.resultCorrect : sim.resultIncorrect}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            {sim.resultExplanation} {selectedChoiceData.explanation}
          </p>
        </div>
      )}

      {/* Weiter / letzter Schritt */}
      {showFeedback && (
        <button
          onClick={handleNext}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
        >
          {isLastStep ? sim.finish : sim.nextStep}
        </button>
      )}
    </div>
  );
}

// ─── RightsSimulation (Haupt-Export) ─────────────────────────────────────────

interface RightsSimulationProps {
  t: Translations;
  onClose: () => void;
}

type SimView =
  | { type: 'selector' }
  | { type: 'runner'; scenarioId: string };

export const RightsSimulation: React.FC<RightsSimulationProps> = ({ t, onClose }) => {
  const [view, setView] = useState<SimView>({ type: 'selector' });

  const allScenarios: SimulationScenario[] = [
    t.simulations.scenarios.identityCheck,
    t.simulations.scenarios.houseSearch,
    t.simulations.scenarios.arrest,
    t.simulations.scenarios.vehicleStop,
  ];

  if (view.type === 'runner') {
    const scenario = allScenarios.find(s => s.id === view.scenarioId);
    if (scenario) {
      return (
        <SimulationRunner
          scenario={scenario}
          t={t}
          onFinish={() => setView({ type: 'selector' })}
        />
      );
    }
  }

  return (
    <SimulationSelector
      t={t}
      onSelect={id => setView({ type: 'runner', scenarioId: id })}
      onClose={onClose}
    />
  );
};

export default RightsSimulation;
