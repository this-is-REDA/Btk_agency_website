import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Smartphone, Globe, Zap } from "lucide-react";

const WebDevelopment = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Web Development</h1>
                        <p className="text-xl text-muted-foreground">
                            Build modern, responsive, and high-performance websites and web applications
                        </p>
                    </div>

                    <Separator className="mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Code className="h-5 w-5" />
                                    Frontend Development
                                </CardTitle>
                                <CardDescription>
                                    Modern, responsive user interfaces built with latest technologies
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• React & Next.js applications</li>
                                    <li>• TypeScript development</li>
                                    <li>• Responsive design</li>
                                    <li>• Performance optimization</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Backend Development
                                </CardTitle>
                                <CardDescription>
                                    Robust server-side applications and APIs
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Node.js & Express APIs</li>
                                    <li>• Database design and integration</li>
                                    <li>• Authentication systems</li>
                                    <li>• Cloud deployment</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Smartphone className="h-5 w-5" />
                                    Mobile-First Design
                                </CardTitle>
                                <CardDescription>
                                    Optimized for all devices and screen sizes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Progressive Web Apps (PWA)</li>
                                    <li>• Mobile optimization</li>
                                    <li>• Touch-friendly interfaces</li>
                                    <li>• Cross-browser compatibility</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5" />
                                    Performance & SEO
                                </CardTitle>
                                <CardDescription>
                                    Fast, secure, and search engine optimized
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Core Web Vitals optimization</li>
                                    <li>• SEO-friendly structure</li>
                                    <li>• Security implementation</li>
                                    <li>• Analytics integration</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="mr-4">
                            Start Project
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

export default WebDevelopment;

