'use client';
import React, { useState } from 'react';
import { Timeline } from '@/components/Timeline';
import { mockTasks, mockUsers } from '@/types/mockData';
import { useMetrics } from '@/hooks/useMetrics';
import { Task } from '@/types';

export default function DashboardHome() {
    // Toggle between 'beginnerUser', 'midUser', or 'expUser' to test out the visual layout variations instantly!
    const { user, trackInteraction } = useMetrics(mockUsers.beginnerUser);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Dynamically filters the core task list based on the active user's current experience level
    const filteredTasks = mockTasks.filter(task => task.targetTier === user.experienceTier);

    const handleTaskSelection = (task: Task) => {
        setSelectedTask(task);
        // Implicitly tracks user profile selection focus targets in the background!
        trackInteraction(task.specialtyTag);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            {/* Dynamic Metric Status Header Banner */}
            <div className="max-w-5xl mx-auto mb-8 p-6 bg-slate-900 rounded-2xl border border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Welcome, {user.fullName} 👋</h1>
                    <p className="text-gray-400 text-sm mt-1">Track system overview & active evaluation milestones.</p>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-indigo-950 border border-indigo-800 rounded-xl text-center">
                        <span className="block text-xs uppercase tracking-wider text-indigo-400 font-mono">Current Tier</span>
                        <span className="text-sm font-bold capitalize text-indigo-200">{user.experienceTier}</span>
                    </div>
                    <div className="px-4 py-2 bg-emerald-950 border border-emerald-800 rounded-xl text-center">
                        <span className="block text-xs uppercase tracking-wider text-emerald-400 font-mono">Hidden Track specialty</span>
                        <span className="text-sm font-bold capitalize text-emerald-200">{user.assignedSpecialty}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Dynamic Project Timeline List Grid */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                        🚀 Onboarding Task Progression Line
                    </h2>
                    <Timeline tasks={filteredTasks} onSelectTask={handleTaskSelection} />
                </div>

                {/* Selected Task Details View Panel Sidebar Drawer */}
                <div className="bg-slate-900 border border-gray-800 rounded-2xl p-6 h-fit sticky top-8">
                    <h2 className="text-xl font-bold mb-4 text-white">Task Workspace</h2>
                    {selectedTask ? (
                        <div>
                            <h3 className="text-lg font-bold text-indigo-400">{selectedTask.title}</h3>
                            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{selectedTask.description}</p>

                            <div className="mt-6 space-y-3">
                                <div className="text-xs text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-800">
                                    Tag: <span className="text-amber-400 font-bold uppercase">{selectedTask.specialtyTag}</span>
                                </div>
                                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-md">
                                    Submit Project Directory (Git Hook URL)
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm italic">Select any unlocked task item along the progression track line to inspect workspace parameters.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
