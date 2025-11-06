import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Target, BarChart3 } from "lucide-react";

const SEOOptimization = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">SEO Optimization</h1>
                        <p className="text-xl text-muted-foreground">
                            Boost your online visibility and drive organic traffic with our comprehensive SEO services
                        </p>
                    </div>

                    <Separator className="mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Search className="h-5 w-5" />
                                    Keyword Research
                                </CardTitle>
                                <CardDescription>
                                    Comprehensive keyword analysis to target the right audience
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Long-tail keyword identification</li>
                                    <li>• Competitor analysis</li>
                                    <li>• Search volume and difficulty assessment</li>
                                    <li>• Local SEO optimization</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    On-Page Optimization
                                </CardTitle>
                                <CardDescription>
                                    Technical and content optimization for better search rankings
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Meta tags and descriptions</li>
                                    <li>• Header structure optimization</li>
                                    <li>• Image alt text and optimization</li>
                                    <li>• Internal linking strategy</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Content Strategy
                                </CardTitle>
                                <CardDescription>
                                    SEO-focused content creation and optimization
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Blog post optimization</li>
                                    <li>• Content calendar planning</li>
                                    <li>• Topic cluster development</li>
                                    <li>• User intent optimization</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Performance Tracking
                                </CardTitle>
                                <CardDescription>
                                    Monitor and analyze your SEO performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Google Analytics integration</li>
                                    <li>• Search Console monitoring</li>
                                    <li>• Ranking position tracking</li>
                                    <li>• Monthly performance reports</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="mr-4">
                            Get Started
                        </Button>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SEOOptimization;

