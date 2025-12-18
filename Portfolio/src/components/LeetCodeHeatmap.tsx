import React from 'react';
import {
    format,
    subDays,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    isSameDay,
    parseISO,
    fromUnixTime,
    getDay,
    startOfYear,
    endOfYear,
    subYears
} from 'date-fns';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface LeetCodeHeatmapProps {
    submissionCalendar: string;
}

const LeetCodeHeatmap: React.FC<LeetCodeHeatmapProps> = ({ submissionCalendar }) => {
    const calendarData: Record<string, number> = JSON.parse(submissionCalendar);

    // Calculate stats
    const today = new Date();
    const timestamps = Object.keys(calendarData).map(Number).sort((a, b) => a - b);
    const totalActiveDays = timestamps.length;
    const totalSubmissions = Object.values(calendarData).reduce((a, b) => a + b, 0);

    // Calculate Streak
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;

    // Convert timestamps to date strings for easier processing
    const datesWithSubmissions = new Set(
        timestamps.map(ts => format(fromUnixTime(ts), 'yyyy-MM-dd'))
    );

    // Check current streak (checking today and going backwards)
    let checkDate = today;
    // If no submission today, check if streak ended yesterday
    if (!datesWithSubmissions.has(format(today, 'yyyy-MM-dd'))) {
        if (datesWithSubmissions.has(format(subDays(today, 1), 'yyyy-MM-dd'))) {
            checkDate = subDays(today, 1);
        } else {
            // Streak broken more than 1 day ago
            currentStreak = 0;
        }
    }

    // Calculate current streak if valid start
    if (datesWithSubmissions.has(format(checkDate, 'yyyy-MM-dd'))) {
        let d = checkDate;
        while (datesWithSubmissions.has(format(d, 'yyyy-MM-dd'))) {
            currentStreak++;
            d = subDays(d, 1);
        }
    }

    // Generate heatmap grid for last year
    const endDate = today;
    const startDate = subYears(today, 1);

    // Adjust start date to start of the week for nice grid alignment
    const gridStartDate = startOfWeek(startDate);

    const days = eachDayOfInterval({ start: gridStartDate, end: endDate });

    const getColor = (count: number) => {
        if (count === 0) return "bg-muted/20 dark:bg-muted/10";
        if (count <= 3) return "bg-green-900/40 dark:bg-green-900/40 border border-green-800/50";
        if (count <= 6) return "bg-green-700/60 dark:bg-green-700/60 border border-green-600/50";
        if (count <= 10) return "bg-green-500/80 dark:bg-green-500/80 border border-green-400/50";
        return "bg-green-400 dark:bg-green-400 border border-green-300";
    };

    // Using user's preference for Red/Orange if requested?
    // The user uploaded an image with RED theme. Let's try to adapt to a generic theme that looks good, 
    // or stick to the portfolio's primary color. The portfolio seems to have a primary color. 
    // Let's use Tailwind 'primary' utilities for consistency, or the specific red style if requested.
    // The user said "mottam stats and heatmap like..." referring to the image. 
    // The image has RED blocks. Let's start with primary/green but maybe switch to red if it fits the theme.
    // User's portfolio has 'primary'. Let's use primary shades.

    const getThemeColor = (count: number) => {
        if (count === 0) return "bg-secondary/30";
        if (count <= 2) return "bg-primary/30";
        if (count <= 5) return "bg-primary/50";
        if (count <= 9) return "bg-primary/70";
        return "bg-primary";
    };

    return (
        <div className="w-full mt-4 space-y-4">
            {/* Stats Summary Line */}
            <div className="flex flex-wrap gap-4 text-xs dark:text-gray-300 transform transition-all">
                <div className="flex gap-1.5 items-center bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
                    <span className="font-bold text-foreground text-sm">{totalSubmissions}</span>
                    <span className="text-muted-foreground">submissions in the last year</span>
                </div>
                <div className="flex gap-1.5 items-center bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
                    <span className="font-bold text-foreground text-sm">{totalActiveDays}</span>
                    <span className="text-muted-foreground">active days</span>
                </div>
                <div className="flex gap-1.5 items-center bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
                    <span className="font-bold text-foreground text-sm">{currentStreak}</span>
                    <span className="text-muted-foreground">day streak</span>
                </div>
            </div>

            {/* Heatmap Grid */}
            <div className="relative overflow-x-auto pb-2">
                <div className="flex gap-1 min-w-max pb-1">
                    {Array.from({ length: 53 }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const day = days[weekIndex * 7 + dayIndex];
                                if (!day || day > endDate) return <div key={dayIndex} className="w-3 h-3" />;

                                const dateStr = format(day, 'yyyy-MM-dd');
                                const dateTimestamp = Number(format(day, 't'));
                                // We need to match precise timestamp keys or just date string matching?
                                // Leetcode uses epoch timestamps. Since we can't match exact seconds, 
                                // we sum up counts for that day.

                                const countForDay = timestamps
                                    .filter(ts => format(fromUnixTime(ts), 'yyyy-MM-dd') === dateStr)
                                    .reduce((sum, ts) => sum + (calendarData[ts] || 0), 0);

                                return (
                                    <TooltipProvider key={dayIndex}>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger>
                                                <div
                                                    className={cn(
                                                        "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-all hover:ring-2 ring-foreground/20 ring-offset-1 ring-offset-background",
                                                        getThemeColor(countForDay)
                                                    )}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent className="text-xs">
                                                {countForDay} submissions on {format(day, 'MMM d, yyyy')}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Months Label (Approximate) */}
                <div className="flex justify-between text-[10px] text-muted-foreground px-2 pt-1 font-medium">
                    <span>{format(subYears(today, 1), 'MMM yyyy')}</span>
                    <span>{format(today, 'MMM yyyy')}</span>
                </div>
            </div>
        </div>
    );
};

export default LeetCodeHeatmap;
