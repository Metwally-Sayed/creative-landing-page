"use client";

import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Magnetic } from "@/components/ui/magnetic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  return (
    <footer className="bg-[#1E335F]">
      {/* CTA Block */}
      <div className="py-16 md:py-24">
        <div className="max-w-[640px] mx-auto px-5 md:px-20 text-center">
          <h2 className="font-playfair font-bold text-[30px] md:text-[48px] text-white mb-4 leading-tight">
            Ready to scale your brand?
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
            Let&apos;s build a system that compounds. Start with a 30-minute strategy call.
          </p>
          <Magnetic intensity={0.15} range={120}>
            <Button className="bg-[#E8874C] text-[#1E335F] hover:bg-[#DE7E45] rounded-xl px-8 py-3.5 font-semibold text-base h-auto mb-12">
              Start Your Project
            </Button>
          </Magnetic>

          {/* Contact / Brief Builder Tabs */}
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="bg-white/10 rounded-xl mb-6">
              <TabsTrigger value="contact" className="data-[state=active]:bg-white/20 text-white rounded-lg px-6 py-2.5">
                <Send className="w-4 h-4 mr-2" />
                Contact
              </TabsTrigger>
              <TabsTrigger value="brief" className="data-[state=active]:bg-white/20 text-white rounded-lg px-6 py-2.5">
                <Sparkles className="w-4 h-4 mr-2" />
                Brief Builder
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <form className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus-visible:ring-[#E8874C]"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus-visible:ring-[#E8874C]"
                  />
                </div>
                <Textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl resize-none focus-visible:ring-[#E8874C]"
                />
                <Button className="w-full bg-[#E8874C] text-[#1E335F] hover:bg-[#DE7E45] rounded-xl py-3 font-semibold h-auto">
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="brief">
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <p className="text-white/60 text-sm mb-4">
                  Describe your project and we&apos;ll generate a creative brief to kick things off.
                </p>
                <PromptInputBox
                  placeholder="I need a complete rebrand for my fintech startup targeting Gen Z users..."
                  className="mb-4 text-white"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 md:px-20 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span className="font-playfair text-xl font-bold text-white">Creative Core</span>
              <p className="text-white/50 text-sm mt-2 leading-relaxed">
                Strategy-first creative studio building brands that compound.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white/80 font-medium text-sm mb-3 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2">
                {["Brand Strategy", "Digital Experience", "Content Direction", "Motion & 3D"].map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-white/50 text-sm hover:text-white/80 transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white/80 font-medium text-sm mb-3 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookies"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/50 text-sm hover:text-white/80 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-white/80 font-medium text-sm mb-3 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2">
                {["LinkedIn", "Instagram", "Dribbble", "X / Twitter"].map((s) => (
                  <li key={s}>
                    <a href="#" className="text-white/50 text-sm hover:text-white/80 transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-white/30 text-sm">
              © 2026 Creative Core. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <Button className="w-full h-14 bg-[#E8874C] text-[#1E335F] hover:bg-[#DE7E45] rounded-none font-semibold text-base touch-manipulation">
        Book a Call
      </Button>
    </div>
  );
}
