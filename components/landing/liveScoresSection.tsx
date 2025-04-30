'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React, { useEffect, useState } from "react";
import {
    Game,
    GameStatus,
    GamesApiResponse,
    MatchCardProps
} from '@/types/nba-games';

// Match card component
function MatchCard({ status, time, teamOne, teamTwo, scoreOne, scoreTwo, action }: MatchCardProps) {
    // Status badge styling
    const getBadgeVariant = (status: GameStatus): "destructive" | "secondary" | "outline" => {
        switch (status) {
            case 'LIVE':
                return 'destructive';
            case 'UPCOMING':
                return 'secondary';
            case 'FINISHED':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Badge variant={getBadgeVariant(status)}>
                        {status === 'LIVE' && (
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-1 animate-pulse" />
                        )}
                        {status}
                    </Badge>
                </div>
                <span className="text-sm text-gray-500 font-medium">{time}</span>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">{teamOne.abbr}</div>
                        <span className="font-medium">{teamOne.name}</span>
                    </div>
                    <span className="text-xl font-bold">{scoreOne}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">{teamTwo.abbr}</div>
                        <span className="font-medium">{teamTwo.name}</span>
                    </div>
                    <span className="text-xl font-bold">{scoreTwo}</span>
                </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-gray-100">
                    {action}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function LiveScoresSection() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGames() {
            try {
                setLoading(true);
                // Get games from our API endpoint
                const response = await fetch('/api/games?days=7');

                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }

                const result: GamesApiResponse = await response.json();

                if (result.success) {
                    setGames(result.data);
                } else {
                    throw new Error(result.error || 'Unknown error');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                console.error('Error fetching games:', err);

                // Fallback to sample data for development
                setGames([
                    {
                        id: 1,
                        gameId: 'sample1',
                        status: 'LIVE',
                        time: 'Q4 2:45',
                        teamOne: { id: 101, name: 'Lakers', abbr: 'LA' },
                        teamTwo: { id: 102, name: 'Warriors', abbr: 'GS' },
                        scoreOne: '102',
                        scoreTwo: '98',
                        venue: { arena: 'Crypto.com Arena', city: 'Los Angeles', state: 'CA', country: 'USA' },
                        date: '2025-04-29',
                        broadcastOn: 'TNT',
                        isPlayoff: true,
                        playoffInfo: { round: '1', gameNumber: '5', summary: null },
                        action: 'View Details'
                    },
                    {
                        id: 2,
                        gameId: 'sample2',
                        status: 'UPCOMING',
                        time: 'Today, 8:30 PM',
                        teamOne: { id: 103, name: 'Nuggets', abbr: 'DEN' },
                        teamTwo: { id: 104, name: 'Kings', abbr: 'SAC' },
                        scoreOne: '-',
                        scoreTwo: '-',
                        venue: { arena: 'Ball Arena', city: 'Denver', state: 'CO', country: 'USA' },
                        date: '2025-04-29',
                        broadcastOn: 'ESPN',
                        isPlayoff: true,
                        playoffInfo: { round: '1', gameNumber: '5', summary: null },
                        action: 'Set Reminder'
                    },
                    {
                        id: 3,
                        gameId: 'sample3',
                        status: 'FINISHED',
                        time: 'FT',
                        teamOne: { id: 105, name: 'Thunder', abbr: 'OKC' },
                        teamTwo: { id: 106, name: 'Rockets', abbr: 'HOU' },
                        scoreOne: '124',
                        scoreTwo: '122',
                        venue: { arena: 'Paycom Center', city: 'Oklahoma City', state: 'OK', country: 'USA' },
                        date: '2025-04-28',
                        broadcastOn: 'TNT',
                        isPlayoff: true,
                        playoffInfo: { round: '1', gameNumber: '4', summary: null },
                        action: 'Match Stats'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchGames();
    }, []);

    // Prepare games for display with action buttons
    const displayGames = games.map(game => ({
        ...game,
        action: game.status === 'LIVE' ? 'View Live' :
            game.status === 'UPCOMING' ? 'Set Reminder' : 'Match Stats'
    }));

    return (
        <section id="live-scores" className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Live Scores & Updates</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get real-time updates from all your favorite leagues and teams in one place.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center p-8 text-red-500">
                        <p>Error loading games: {error}</p>
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {displayGames.length > 0 ? (
                                displayGames.slice(0, 6).map(game => (
                                    <MatchCard
                                        key={game.id}
                                        status={game.status}
                                        time={game.time}
                                        teamOne={game.teamOne}
                                        teamTwo={game.teamTwo}
                                        scoreOne={game.scoreOne}
                                        scoreTwo={game.scoreTwo}
                                        action={game.action || 'View Details'}
                                    />
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12 text-gray-500">
                                    No upcoming games found. Check back later!
                                </div>
                            )}
                        </div>

                        <div className="text-center mt-10">
                            <Button className="bg-indigo-600 rounded-3xl border-black border-2 p-2 hover:bg-indigo-700 py-6 px-8 text-lg">
                                View All Scores <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}