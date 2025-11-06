import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, PenTool, Layers, Eye } from "lucide-react";

const BrandDesign = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Brand Design</h1>
                        <p className="text-xl text-muted-foreground">
                            Create a memorable brand identity that resonates with your audience
                        </p>
                    </div>

                    <Separator className="mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-5 w-5" />
                                    Logo Design
                                </CardTitle>
                                <CardDescription>
                                    Unique and memorable logos that represent your brand
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Custom logo concepts</li>
                                    <li>• Brand identity guidelines</li>
                                    <li>• Logo variations and formats</li>
                                    <li>• Brand style guide</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PenTool className="h-5 w-5" />
                                    Visual Identity
                                </CardTitle>
                                <CardDescription>
                                    Complete visual identity system for your brand
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Color palette development</li>
                                    <li>• Typography selection</li>
                                    <li>• Icon and illustration style</li>
                                    <li>• Photography guidelines</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Layers className="h-5 w-5" />
                                    Brand Assets
                                </CardTitle>
                                <CardDescription>
                                    Complete set of brand assets for all touchpoints
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Business card design</li>
                                    <li>• Letterhead and stationery</li>
                                    <li>• Social media templates</li>
                                    <li>• Marketing materials</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Eye className="h-5 w-5" />
                                    Brand Strategy
                                </CardTitle>
                                <CardDescription>
                                    Strategic approach to brand positioning and messaging
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Brand positioning</li>
                                    <li>• Target audience analysis</li>
                                    <li>• Competitive differentiation</li>
                                    <li>• Brand voice and tone</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="mr-4">
                            Start Project
                        </Button>
                        <Button variant="outline" size="lg">
                            View Gallery
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BrandDesign;

