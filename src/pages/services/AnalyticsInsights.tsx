import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Target, Database } from "lucide-react";

const AnalyticsInsights = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Analytics & Insights</h1>
                        <p className="text-xl text-muted-foreground">
                            Make data-driven decisions with comprehensive analytics and insights
                        </p>
                    </div>

                    <Separator className="mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Web Analytics
                                </CardTitle>
                                <CardDescription>
                                    Track and analyze your website performance
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Google Analytics setup</li>
                                    <li>• Custom event tracking</li>
                                    <li>• Conversion funnel analysis</li>
                                    <li>• User behavior insights</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Performance Monitoring
                                </CardTitle>
                                <CardDescription>
                                    Real-time monitoring of key performance indicators
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• KPI dashboard creation</li>
                                    <li>• Automated reporting</li>
                                    <li>• Performance alerts</li>
                                    <li>• Trend analysis</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Business Intelligence
                                </CardTitle>
                                <CardDescription>
                                    Transform data into actionable business insights
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Data visualization</li>
                                    <li>• Predictive analytics</li>
                                    <li>• Market research analysis</li>
                                    <li>• Competitive intelligence</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5" />
                                    Data Integration
                                </CardTitle>
                                <CardDescription>
                                    Connect and analyze data from multiple sources
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Multi-platform data integration</li>
                                    <li>• API connections</li>
                                    <li>• Data cleaning and processing</li>
                                    <li>• Custom data pipelines</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="mr-4">
                            Get Started
                        </Button>
                        <Button variant="outline" size="lg">
                            View Sample Report
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AnalyticsInsights;

