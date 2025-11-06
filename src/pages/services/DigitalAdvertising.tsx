import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Target, TrendingUp, BarChart3 } from "lucide-react";

const DigitalAdvertising = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Digital Advertising</h1>
                        <p className="text-xl text-muted-foreground">
                            Maximize your ROI with targeted digital advertising campaigns across all platforms
                        </p>
                    </div>

                    <Separator className="mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Megaphone className="h-5 w-5" />
                                    Google Ads
                                </CardTitle>
                                <CardDescription>
                                    Reach customers when they're actively searching for your services
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Search campaign optimization</li>
                                    <li>• Display network advertising</li>
                                    <li>• Shopping campaign management</li>
                                    <li>• YouTube advertising</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Social Media Ads
                                </CardTitle>
                                <CardDescription>
                                    Engage your audience on Facebook, Instagram, LinkedIn, and more
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Facebook & Instagram campaigns</li>
                                    <li>• LinkedIn B2B advertising</li>
                                    <li>• Twitter promoted content</li>
                                    <li>• TikTok advertising</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Campaign Strategy
                                </CardTitle>
                                <CardDescription>
                                    Data-driven approach to campaign planning and execution
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Audience research and targeting</li>
                                    <li>• Budget allocation optimization</li>
                                    <li>• A/B testing and optimization</li>
                                    <li>• Creative development</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Performance Analytics
                                </CardTitle>
                                <CardDescription>
                                    Track and optimize your advertising performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Real-time campaign monitoring</li>
                                    <li>• Conversion tracking setup</li>
                                    <li>• ROI analysis and reporting</li>
                                    <li>• Continuous optimization</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="mr-4">
                            Start Campaign
                        </Button>
                        <Button variant="outline" size="lg">
                            View Portfolio
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DigitalAdvertising;

