#pragma checksum "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "11af04f99b64dc9981154f995081296ef125e862"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Home/Index.cshtml", typeof(AspNetCore.Views_Home_Index))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/_ViewImports.cshtml"
using assignment4;

#line default
#line hidden
#line 2 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/_ViewImports.cshtml"
using assignment4.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"11af04f99b64dc9981154f995081296ef125e862", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e960d6a6e7854e31b67fb57acfb263255e1b8953", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#line 1 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml"
  
    ViewData["Title"] = "Home Page";
    var shopping_list = ViewBag.shopping_list;

#line default
#line hidden
            BeginContext(93, 21, true);
            WriteLiteral("\r\n<div class=\"row\">\r\n");
            EndContext();
#line 7 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml"
     for (var i = 0; i < shopping_list.Count; i++)
    {

#line default
#line hidden
            BeginContext(172, 167, true);
            WriteLiteral("        <div class=\"col-md-3\">\r\n            <div class=\"bg-light rounded mt-2 mb-2\">\r\n                <div class=\" p-2\">\r\n                    <h3 class=\"text-primary\">");
            EndContext();
            BeginContext(340, 22, false);
#line 12 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml"
                                        Write(shopping_list[i].Title);

#line default
#line hidden
            EndContext();
            BeginContext(362, 50, true);
            WriteLiteral("</h3>\r\n                    <div class=\"text-grey\">");
            EndContext();
            BeginContext(413, 28, false);
#line 13 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml"
                                      Write(shopping_list[i].Description);

#line default
#line hidden
            EndContext();
            BeginContext(441, 108, true);
            WriteLiteral("</div>\r\n                </div>\r\n                <div>\r\n                    <img class=\"w-100 rounded-bottom\"");
            EndContext();
            BeginWriteAttribute("src", " src=", 549, "", 575, 1);
#line 16 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml"
WriteAttributeValue("", 554, shopping_list[i].Url, 554, 21, false);

#line default
#line hidden
            EndWriteAttribute();
            BeginContext(575, 64, true);
            WriteLiteral(" />\r\n                </div>\r\n            </div>\r\n        </div>\n");
            EndContext();
#line 20 "/Users/abhinay/GitHub/aspnet_core_mvc/Views/Home/Index.cshtml"
    }

#line default
#line hidden
            BeginContext(646, 6, true);
            WriteLiteral("</div>");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
