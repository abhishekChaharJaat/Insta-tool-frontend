import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — InstaToolkit",
  description:
    "InstaToolkit disclaimer. This tool is for personal and educational use only. Not affiliated with Instagram or Meta.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold mb-4">Disclaimer</h1>
      <p className="text-sm text-zinc-400 mb-10">Last updated: January 2024</p>

      <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Personal & Educational Use Only</h2>
          <p>
            InstaToolkit is designed exclusively for personal and educational use. The tools provided —
            including the Instagram downloader, caption generator, hashtag generator, bio generator, and
            username generator — are intended to assist individuals in managing their own content and learning
            about Instagram best practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">No Affiliation with Instagram or Meta</h2>
          <p>
            InstaToolkit is an independent service and is not affiliated with, authorized by, endorsed by,
            or in any way officially connected to Instagram, Meta Platforms, Inc., or any of their subsidiaries
            or affiliates. The Instagram name, logo, and related marks are trademarks of Meta Platforms, Inc.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Copyright & Intellectual Property</h2>
          <p>
            Users are solely responsible for how they use downloaded content. Downloading content from Instagram
            that you do not own may infringe on the copyright of the original content creator. We strongly advise:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside text-sm">
            <li>Only download content that you own or have explicit permission to download</li>
            <li>Do not re-upload, redistribute, or use others&apos; content commercially without permission</li>
            <li>Respect Instagram&apos;s Terms of Service and Community Guidelines</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">No Data Storage</h2>
          <p>
            InstaToolkit does not store, log, or retain any user data, including URLs submitted for processing,
            generated content, or any personal information. All processing is performed in real-time and discarded
            immediately after the request is fulfilled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">No Warranty</h2>
          <p>
            The service is provided &quot;as is&quot; without warranty of any kind. InstaToolkit makes no representations
            or warranties about the accuracy, reliability, or availability of the service. The downloader may not
            work on private accounts, deleted posts, or if Instagram updates their platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">Limitation of Liability</h2>
          <p>
            InstaToolkit shall not be liable for any direct, indirect, incidental, special, or consequential
            damages arising out of or in connection with your use of the service.
          </p>
        </section>

        <div className="mt-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 text-sm font-medium">
          ⚠️ <strong>Summary:</strong> This tool is for personal and educational use only. We do not store your data.
          Always respect copyright and Instagram&apos;s Terms of Service. We are not affiliated with Instagram or Meta.
        </div>
      </div>
    </div>
  );
}
