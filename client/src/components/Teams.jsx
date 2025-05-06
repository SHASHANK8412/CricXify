import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card-header'; // separate import
import { CardTitle } from '@/components/ui/card-title'; // separate import
import Badge from '@/components/ui/badge'; // ✅ CORRECT for default export

import { motion, AnimatePresence } from 'framer-motion';
import { Info, Flag, Users, Award, ChevronDown, ChevronUp } from 'lucide-react'; // Import icons
import { cn } from "@/lib/utils"

// JSDoc for team data
/**
 * @typedef {object} TeamData
 * @property {string} name
 * @property {'international' | 'league'} type
 * @property {string} color
 * @property {string} logo
 * @property {string} [league]
 * @property {string} info
 */

// Function to generate a random logo URL
const getRandomLogo = () => {
    const logoUrls = [
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/India_national_cricket_team_logo.svg/1200px-India_national_cricket_team_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Australia_national_cricket_team_logo.svg/1200px-Australia_national_cricket_team_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/England_cricket_team_logo.svg/1200px-England_cricket_team_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/South_Africa_national_cricket_team_logo.svg/1200px-South_Africa_national_cricket_team_logo.svg.png',
        // 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png', // Removed MI
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Royal_Challengers_Bangalore_logo.svg/1200px-Royal_Challengers_Bangalore_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Gujarat_Titans_Logo.svg/1200px-Gujarat_Titans_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Lucknow_Super_Giants_Logo.svg/1200px-Lucknow_Super_Giants_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Mumbai_Cricket_Association_Logo.svg/1200px-Mumbai_Cricket_Association_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Karnataka_State_Cricket_Association_Logo.svg/1200px-Karnataka_State_Cricket_Association_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Guyana_Amazon_Warriors_logo.svg/1200px-Guyana_Amazon_Warriors_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Trinbago_Knight_Riders_logo.svg/1200px-Trinbago_Knight_Riders_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Jamaica_Tallawahs_logo.svg/1200px-Jamaica_Tallawahs_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Barbados_Tridents_logo.svg/1200px-Barbados_Tridents_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/Sydney_Sixers_logo.svg/1200px-Sydney_Sixers_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Perth_Scorchers_Logo.svg/1200px-Perth_Scorchers_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Melbourne_Stars_logo.svg/1200px-Melbourne_Stars_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Brisbane_Heat_logo.svg/1200px-Brisbane_Heat_logo.svg.png',
        'https://sportza.co.za/wp-content/uploads/2023/01/SEC-Logo.png',
        'https://sportza.co.za/wp-content/uploads/2023/01/PRE-Logo.png',
        'https://sportza.co.za/wp-content/uploads/2023/01/JSK-Logo.png',
        'https://sportza.co.za/wp-content/uploads/2023/01/PR-Logo.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Lahore_Qalandars_logo.svg/1200px-Lahore_Qalandars_logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Islamabad_United_Logo.svg/1200px-Islamabad_United_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Karachi_Kings_Logo.svg/1200px-Karachi_Kings_Logo.svg.png',
        'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Peshawar_Zalmi_logo.svg/1200px-Peshawar_Zalmi_logo.svg.png',
    ];
    return logoUrls[Math.floor(Math.random() * logoUrls.length)];
};

// Data for cricket teams
const cricketTeams = [
    // International Teams
    {
        name: 'India',
        type: 'international',
        color: 'bg-blue-800 text-white', // Changed to standard Tailwind blue
        logo: getRandomLogo(),
        info: 'The most followed cricket team, known for strong batting.',
    },
    {
        name: 'Australia',
        type: 'international',
        color: 'bg-yellow-400 text-black', // Changed to yellow background with black text for better visibility
        logo: getRandomLogo(),
        info: 'One of the most successful teams, known for aggressive play.',
    },
    {
        name: 'England',
        type: 'international',
        color: 'bg-red-600 text-white',
        logo: getRandomLogo(),
        info: 'The inventors of cricket, with a long and storied history.',
    },
    {
        name: 'South Africa',
        type: 'international',
        color: 'bg-green-600 text-white',
        logo: getRandomLogo(),
        info: 'A strong team with world-class fast bowlers and batsmen.',
    },
    {
        name: 'Pakistan',
        type: 'international',
        color: 'bg-emerald-600 text-white',
        logo: getRandomLogo(),
        info: 'Known for their unpredictable play and talented fast bowlers.',
    },
    {
        name: 'Sri Lanka',
        type: 'international',
        color: 'bg-sky-500 text-white',
        logo: getRandomLogo(),
        info: 'A team with a rich history of spin bowling and exciting strokeplay.',
    },
    {
        name: 'New Zealand',
        type: 'international',
        color: 'bg-black text-white',
        logo: getRandomLogo(),
        info: 'Known for their sportsmanship and consistent performance.',
    },
    {
        name: 'West Indies',
        type: 'international',
        color: 'bg-red-800 text-white', // Changed to dark red
        logo: getRandomLogo(),
        info: 'A team with a legendary history of powerful batsmen.',
    },
    {
        name: 'Bangladesh',
        type: 'international',
        color: 'bg-red-500 text-white',
        logo: getRandomLogo(),
        info: 'A team that has been steadily improving.',
    },
    {
        name: 'Afghanistan',
        type: 'international',
        color: 'bg-blue-700 text-white',
        logo: getRandomLogo(),
        info: 'A rapidly emerging team, known for their strong spin bowling.',
    },
    {
        name: 'Ireland',
        type: 'international',
        color: 'bg-green-500 text-white',
        logo: getRandomLogo(),
        info: 'A team that has made a mark on the international stage.',
    },
    {
        name: 'Scotland',
        type: 'international',
        color: 'bg-blue-400 text-white',
        logo: getRandomLogo(),
        info: 'A team known for its fighting spirit and growing talent.',
    },
    {
        name: 'Zimbabwe',
        type: 'international',
        color: 'bg-yellow-600 text-white',
        logo: getRandomLogo(),
        info: 'A team with a history of producing talented cricketers.',
    },
    {
        name: 'Netherlands',
        type: 'international',
        color: 'bg-orange-400 text-white',
        logo: getRandomLogo(),
        info: 'A team that has shown its potential in international cricket.',
    },
    // IPL Teams
    {
        name: 'Mumbai Indians',
        type: 'league',
        color: 'bg-blue-700 text-white',
        logo: getRandomLogo(),
        league: 'IPL',
        info: 'One of the most successful franchises in the IPL.',
    },
    {
        name: 'Chennai Super Kings',
        type: 'league',
        color: 'bg-yellow-500 text-black',
        logo: getRandomLogo(),
        league: 'IPL',
        info: 'A highly successful and consistent team in the IPL.',
    },
    {
        name: 'Kolkata Knight Riders',
        type: 'league',
        color: 'bg-purple-500 text-white',
        logo: getRandomLogo(),
        league: 'IPL',
        info: 'Known for its exciting and stylish brand of cricket.',
    },
    {
        name: 'Royal Challengers Bangalore',
        type: 'league',
        color: 'bg-red-700 text-white',
        logo: getRandomLogo(),
        league: 'IPL',
        info: 'A team with a star-studded batting lineup.',
    },
    {
        name: 'Gujarat Titans',
        type: 'league',
        color: 'bg-sky-500 text-white',
        logo: getRandomLogo(),
        league: 'IPL',
        info: 'One of the newer franchises, making a strong impact.',
    },
    {
        name: 'Lucknow Super Giants',
        type: 'league',
        color: 'bg-teal-600 text-white',
        logo: getRandomLogo(),
        league: 'IPL',
        info: 'A new franchise with a mix of experience and youth.',
    },

    // Ranji Trophy Teams (Example - can't include all due to large number)
    {
        name: 'Mumbai',
        type: 'league',
        color: 'bg-blue-600 text-white',
        logo: getRandomLogo(), // Example logo
        league: 'Ranji Trophy',
        info: 'One of the most successful teams in Ranji Trophy history.',
    },
    {
        name: 'Karnataka',
        type: 'league',
        color: 'bg-red-700 text-white',
        logo: getRandomLogo(), // Example
        league: 'Ranji Trophy',
        info: 'A dominant team with a history of producing great players.',
    },

    // CPL Teams
    {
        name: 'Guyana Amazon Warriors',
        type: 'league',
        color: 'bg-green-600 text-white',
        logo: getRandomLogo(),
        league: 'CPL',
        info: 'One of the most consistent teams in the CPL.',
    },
    {
        name: 'Trinbago Knight Riders',
        type: 'league',
        color: 'bg-purple-600 text-white',
        logo: getRandomLogo(),
        league: 'CPL',
        info: 'One of the most successful teams in the CPL.',
    },
    {
        name: 'Jamaica Tallawahs',
        type: 'league',
        color: 'bg-green-500 text-white',
        logo: getRandomLogo(),
        league: 'CPL',
        info: 'A team with a rich history in the CPL.',
    },
     {
        name: 'Barbados Royals',
        type: 'league',
        color: 'bg-blue-500 text-white',
        logo: getRandomLogo(),
        league: 'CPL',
        info: 'A team known for its strong performances.',
    },

    // BBL Teams
    {
        name: 'Sydney Sixers',
        type: 'league',
        color: 'bg-magenta-600 text-white',
        logo: getRandomLogo(),
        league: 'BBL',
        info: 'A very successful team in the BBL.',
    },
    {
        name: 'Perth Scorchers',
        type: 'league',
        color: 'bg-orange-500 text-white',
        logo: getRandomLogo(),
        league: 'BBL',
        info: 'Known for their strong bowling attacks.',
    },
    {
        name: 'Melbourne Stars',
        type: 'league',
        color: 'bg-green-600 text-white',
        logo: getRandomLogo(),
        league: 'BBL',
        info: 'Known for their exciting T20 style.',
    },
    {
        name: 'Brisbane Heat',
        type: 'league',
        color: 'bg-red-500 text-white',
        logo: getRandomLogo(),
        league: 'BBL',
        info: 'Known for their aggressive batting.',
    },

    // SA20 Teams
    {
        name: 'Sunrisers Eastern Cape',
        type: 'league',
        color: 'bg-orange-500 text-white',
        logo: getRandomLogo(), // Placeholder, find correct logo
        league: 'SA20',
        info: 'A team in the SA20 league.',
    },
    {
        name: 'Pretoria Capitals',
        type: 'league',
        color: 'bg-blue-600 text-white',
        logo: getRandomLogo(),  // Placeholder
        league: 'SA20',
        info: 'A team based in Pretoria in the SA20.',
    },
      {
        name: 'Joburg Super Kings',
        type: 'league',
        color: 'bg-yellow-500 text-black',
        logo: getRandomLogo(),  // Placeholder
        league: 'SA20',
        info: 'A team based in Johannesburg in the SA20.',
    },
    {
        name: 'Paarl Royals',
        type: 'league',
        color: 'bg-blue-700 text-white',
        logo: getRandomLogo(),  // Placeholder
        league: 'SA20',
        info: 'A team based in Paarl in the SA20.',
    },

    // PSL Teams
      {
        name: 'Lahore Qalandars',
        type: 'league',
        color: 'bg-green-600 text-white',
        logo: getRandomLogo(),
        league: 'PSL',
        info: 'A team known for its exciting fast bowlers.',
    },
    {
        name: 'Islamabad United',
        type: 'league',
        color: 'bg-red-500 text-white',
        logo: getRandomLogo(),
        league: 'PSL',
        info: 'One of the most successful teams in PSL history.',
    },
    {
        name: 'Karachi Kings',
        type: 'league',
        color: 'bg-blue-500 text-white',
        logo: getRandomLogo(),
        league: 'PSL',
        info: 'A team representing the vibrant city of Karachi.',
    },
    {
        name: 'Peshawar Zalmi',
        type: 'league',
        color: 'bg-yellow-600 text-white',
        logo: getRandomLogo(),
        league: 'PSL',
        info: 'A team with a large fan base.',
    },
];

// Animation variants
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const TeamCard = ({ team }) => { // Removed : React.FC<{ team: TeamData }>
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
        >
            <Card
                className={`w-full overflow-hidden border-gray-200 shadow-md transition-all duration-300
                            hover:shadow-lg hover:scale-[1.01] ${team.color}`} // Added team color
            >
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center gap-4">
                        <img
                            src={team.logo}
                            alt={`${team.name} logo`}
                            className="w-12 h-12 rounded-full"
                            style={{ minWidth: '48px', minHeight: '48px' }}
                        />
                        <CardTitle className="text-lg font-semibold text-white">
                            {team.name}
                        </CardTitle>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        {team.type === 'international' ? (
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "bg-green-500/20 text-green-400 text-white flex items-center gap-1",
                                )}
                            >
                                <Flag className="w-4 h-4" /> International
                            </Badge>
                        ) : (
                            <Badge
                                variant="secondary"
                                className="bg-blue-500/20 text-blue-400 text-white flex items-center gap-1"
                            >
                                 <Users className="w-4 h-4" /> {team.league}
                            </Badge>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-200 self-start sm:self-center" // Adjusted text color
                        >
                            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </Button>
                    </div>
                </CardHeader>
                <AnimatePresence>
                    {isOpen && (
                        <CardContent className="pt-0">
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-2"
                            >
                                 <p className="text-sm text-gray-200 flex items-start gap-1.5">  {/* Adjusted text color */}
                                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    {team.info}
                                </p>
                            </motion.div>
                        </CardContent>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
};

const Teams = () => {
    const [selectedType, setSelectedType] = useState('international');

    const filteredTeams = cricketTeams.filter(team => team.type === selectedType);

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
                    <Award className="w-8 h-8 text-yellow-500" />
                    Cricket Teams
                </h1>
                <div className="flex justify-center space-x-4 mb-8">
                    <Button
                        variant={selectedType === 'international' ? 'default' : 'outline'}
                        onClick={() => setSelectedType('international')}
                        className={selectedType === 'international' ? 'bg-green-500 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}
                    >
                        International Teams
                    </Button>
                    <Button
                        variant={selectedType === 'league' ? 'default' : 'outline'}
                        onClick={() => setSelectedType('league')}
                        className={selectedType === 'league' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}
                    >
                        League Teams
                    </Button>
                </div>
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredTeams.map(team => (
                            <TeamCard key={team.name} team={team} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Teams;

