package com.glanceexample;

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import net.glance.android.GlanceWebViewClient;
import net.glance.android.GlanceWebViewJavascriptInterface;

//TODO: make sure that it's still possible to see the GlanceSDK dependency after extracting the native module to a NPM package.
public class GlanceWebViewActivity extends AppCompatActivity {
    WebView webView;
    GlanceWebViewClient webViewClient;
    GlanceWebViewJavascriptInterface jsInterface;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_glance_web_view);

        String url = (String) getIntent().getExtras().get("url");
        String querySelectors = (String) getIntent().getExtras().get("querySelectors");
        String labels = (String) getIntent().getExtras().get("labels");

        webView = findViewById(R.id.web_view);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            webView.getSettings().setMixedContentMode(2);
        }
        jsInterface = new GlanceWebViewJavascriptInterface(webView);
        webView.addJavascriptInterface(jsInterface, "GLANCE_Mask");

        webViewClient = new GlanceWebViewClient(querySelectors, labels);
        webView.setWebViewClient(webViewClient);

        webView.loadUrl(url);
    }

    @Override
    protected void onDestroy() {
        webView.removeJavascriptInterface("GLANCE_Mask");
        jsInterface.onDestroy();
        super.onDestroy();
    }
}
