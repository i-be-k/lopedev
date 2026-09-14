import React from 'react';
import { Task, TaskStatus } from '@/types';
import { CheckCircle2, Lock, PlayCircle, Eye } from 'lucide-react';

interface TimelineProps {
    tasks: Task[];
    onSelectTask: (task: Task) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ tasks, onSelectTask }) => {
    const getStatusIcon = (status: TaskStatus) => {
        switch (status) {
            case 'passed': return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
            case 'locked': return <Lock className="w-6 h-6 text-gray-500" />;
            case 'in_progress': return <PlayCircle className="w-6 h-6 text-amber-500" />;
            default: return <Eye className="w-6 h-6 text-blue-500" />;
        }
    };

    return (
        <div className="relative border-l border-gray-700 ml-4 space-y-8 py-4">
            {tasks.map((task) => (
                <div key={task.id} className="mb-10 ml-6 relative group">
                    {/* Status Indicator Icon */}
                    <span className="absolute -left-[40px] bg-slate-900 p-1 rounded-full border border-gray-700">
                        {getStatusIcon(task.status)}
                    </span>

                    {/* Task Card Box */}
                    <div className={`p-5 rounded-xl border transition-all ${
                        task.status === 'locked' 
                            ? 'bg-slate-900/50 border-gray-800 opacity-60 pointer-events-none' 
                            : 'bg-slate-900 border-gray-700 hover:border-indigo-500 cursor-pointer shadow-lg'
                        }`} onClick={() => task.status !== 'locked' && onSelectTask(task)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-mono px-2 py-1 bg-indigo-950 text-indigo-400 rounded-md border border-indigo-800">
                                Day {task.unlockDay} Task
                            </span>
                            <span className="text-sm font-semibold text-gray-400">{task.pointsWorth} Pts</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{task.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{task.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
