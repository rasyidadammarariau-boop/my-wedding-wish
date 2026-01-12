import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  Users,
} from "lucide-react";
import { toast } from "sonner";

const dummyInvitations = [
  {
    id: "1",
    title: "Pernikahan John & Jane",
    template: "Elegant Rose",
    date: "15 Feb 2026",
    status: "published",
    views: 245,
    rsvp: 89,
    url: "weddingku.id/john-jane",
  },
  {
    id: "2",
    title: "Pernikahan Michael & Sarah",
    template: "Minimalist White",
    date: "28 Mar 2026",
    status: "draft",
    views: 0,
    rsvp: 0,
    url: "weddingku.id/michael-sarah",
  },
];

const InvitationsTab = () => {
  const navigate = useNavigate();
  const [invitations] = useState(dummyInvitations);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success("Link undangan disalin!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Undangan Saya</h2>
          <p className="text-muted-foreground text-sm">Kelola semua undangan pernikahan Anda</p>
        </div>
        <Button variant="hero" onClick={() => navigate("/templates")}>
          <Plus className="h-4 w-4 mr-2" />
          Buat Undangan Baru
        </Button>
      </div>

      {/* Invitations Grid */}
      {invitations.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Anda belum memiliki undangan. Buat undangan pertama Anda!
            </p>
            <Button variant="hero" onClick={() => navigate("/templates")}>
              <Plus className="h-5 w-5 mr-2" />
              Buat Undangan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {invitations.map((invitation, index) => (
            <motion.div
              key={invitation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-card hover:shadow-lg transition-all overflow-hidden">
                {/* Header with gradient */}
                <div className="h-3 bg-gradient-to-r from-primary to-primary/60" />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-display text-lg">{invitation.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{invitation.template}</p>
                    </div>
                    <Badge variant={invitation.status === "published" ? "default" : "secondary"}>
                      {invitation.status === "published" ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Published
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Draft
                        </>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-3 bg-secondary/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{invitation.views}</p>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center border-x border-border">
                      <p className="text-lg font-bold text-foreground">{invitation.rsvp}</p>
                      <p className="text-xs text-muted-foreground">RSVP</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{invitation.date}</p>
                      <p className="text-xs text-muted-foreground">Tanggal</p>
                    </div>
                  </div>

                  {/* URL */}
                  <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                    <span className="text-sm text-muted-foreground truncate flex-1">
                      {invitation.url}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => handleCopyLink(invitation.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/demo/${invitation.template.toLowerCase().replace(' ', '-')}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/editor/${invitation.id}`)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate("/dashboard?tab=guests")}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Tamu
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvitationsTab;
