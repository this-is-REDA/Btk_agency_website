import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  TrendingUp, 
  Heart,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Target,
      title: t('aboutPage.innovation'),
      description: t('aboutPage.innovationDesc')
    },
    {
      icon: Heart,
      title: t('aboutPage.clientSuccess'),
      description: t('aboutPage.clientSuccessDesc')
    },
    {
      icon: Award,
      title: t('aboutPage.excellence'),
      description: t('aboutPage.excellenceDesc')
    },
    {
      icon: Users,
      title: t('aboutPage.collaboration'),
      description: t('aboutPage.collaborationDesc')
    }
  ];

  const team = [
    {
      name: t('aboutPage.team.sarah.name'),
      position: t('aboutPage.team.sarah.position'),
      image: "/placeholder.svg",
      bio: t('aboutPage.team.sarah.bio'),
      expertise: [t('aboutPage.team.sarah.expertise1'), t('aboutPage.team.sarah.expertise2'), t('aboutPage.team.sarah.expertise3')]
    },
    {
      name: t('aboutPage.team.michael.name'),
      position: t('aboutPage.team.michael.position'),
      image: "/placeholder.svg",
      bio: t('aboutPage.team.michael.bio'),
      expertise: [t('aboutPage.team.michael.expertise1'), t('aboutPage.team.michael.expertise2'), t('aboutPage.team.michael.expertise3')]
    },
    {
      name: t('aboutPage.team.david.name'),
      position: t('aboutPage.team.david.position'),
      image: "/placeholder.svg",
      bio: t('aboutPage.team.david.bio'),
      expertise: [t('aboutPage.team.david.expertise1'), t('aboutPage.team.david.expertise2'), t('aboutPage.team.david.expertise3')]
    },
    {
      name: t('aboutPage.team.emma.name'),
      position: t('aboutPage.team.emma.position'),
      image: "/placeholder.svg",
      bio: t('aboutPage.team.emma.bio'),
      expertise: [t('aboutPage.team.emma.expertise1'), t('aboutPage.team.emma.expertise2'), t('aboutPage.team.emma.expertise3')]
    },
    {
      name: t('aboutPage.team.lisa.name'),
      position: t('aboutPage.team.lisa.position'),
      image: "/placeholder.svg",
      bio: t('aboutPage.team.lisa.bio'),
      expertise: [t('aboutPage.team.lisa.expertise1'), t('aboutPage.team.lisa.expertise2'), t('aboutPage.team.lisa.expertise3')]
    }
  ];

  const stats = [
    { number: "150+", label: t('aboutPage.happyClients'), icon: Users },
    { number: "500+", label: t('aboutPage.projectsCompleted'), icon: Award },
    { number: "98%", label: t('aboutPage.clientSatisfaction'), icon: Heart },
    { number: "24/7", label: t('aboutPage.supportAvailable'), icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('aboutPage.title').split(' ')[0]} <span className="text-primary">{t('aboutPage.title').split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('aboutPage.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('aboutPage.founding.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('aboutPage.ourStory.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('aboutPage.ourStory.paragraph1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t('aboutPage.ourStory.paragraph2')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('aboutPage.ourStory.paragraph3')}
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">{t('aboutPage.whyChoose.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('aboutPage.whyChoose.provenTrack')}</div>
                    <div className="text-sm text-muted-foreground">{t('aboutPage.whyChoose.provenTrackDesc')}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('aboutPage.whyChoose.expertTeam')}</div>
                    <div className="text-sm text-muted-foreground">{t('aboutPage.whyChoose.expertTeamDesc')}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('aboutPage.whyChoose.customSolutions')}</div>
                    <div className="text-sm text-muted-foreground">{t('aboutPage.whyChoose.customSolutionsDesc')}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{t('aboutPage.whyChoose.ongoingSupport')}</div>
                    <div className="text-sm text-muted-foreground">{t('aboutPage.whyChoose.ongoingSupportDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('aboutPage.values.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('aboutPage.values.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('aboutPage.team.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('aboutPage.team.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{t('aboutPage.mission.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('aboutPage.mission.description1')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('aboutPage.mission.description2')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{t('aboutPage.vision.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t('aboutPage.vision.description1')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('aboutPage.vision.description2')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('aboutPage.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('aboutPage.cta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <Button size="lg" variant="secondary" className="group">
                {t('aboutPage.cta.button')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About; 