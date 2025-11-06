import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Users, Heart, MessageCircle } from "lucide-react";

const SocialMediaMarketing = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Social Media Marketing</h1>
                        <p className="text-xl text-muted-foreground">
                            Build and engage your community across all social media platforms
                        </p>
                    </div>

                    <Separator className="mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Share2 className="h-5 w-5" />
                                    Content Strategy
                                </CardTitle>
                                <CardDescription>
                                    Engaging content that resonates with your audience
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Content calendar planning</li>
                                    <li>• Visual content creation</li>
                                    <li>• Video marketing</li>
                                    <li>• Storytelling campaigns</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Community Management
                                </CardTitle>
                                <CardDescription>
                                    Build and nurture your social media community
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Community engagement</li>
                                    <li>• Customer service</li>
                                    <li>• Influencer partnerships</li>
                                    <li>• User-generated content</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Heart className="h-5 w-5" />
                                    Brand Awareness
                                </CardTitle>
                                <CardDescription>
                                    Increase your brand visibility and recognition
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Brand storytelling</li>
                                    <li>• Hashtag campaigns</li>
                                    <li>• Viral content creation</li>
                                    <li>• Cross-platform promotion</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Social Advertising
                                </CardTitle>
                                <CardDescription>
                                    Targeted advertising campaigns on social platforms
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li>• Facebook & Instagram ads</li>
                                    <li>• LinkedIn B2B campaigns</li>
                                    <li>• TikTok advertising</li>
                                    <li>• Performance optimization</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="text-center">
                        <Button size="lg" className="mr-4">
                            Start Campaign
                        </Button>
                        <Button variant="outline" size="lg">
                            View Case Studies
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SocialMediaMarketing;

