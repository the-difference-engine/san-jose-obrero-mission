var userPayload = [{"id":1,"email":"a@mail.com","role":"admin","password_digest":"$2a$10$Ubg3KkyZTSU/xjyi4tBf3e21tCgHgc0tmQq.aUm2iZqq19VFvg04S"},{"id":2,"email":"cm@mail.com","role":"case_manager","password_digest":"$2a$10$PVNB0/fps/RG1zzx.UqAJ.dS2zwRDKKCUyaYvPZtw2aGkMhPHnNIS"},{"id":3,"email":"ra@mail.com","role":"residential_aide","password_digest":"$2a$10$RCkcdS4gtFxSO82bU9X3buSZiZlk59Cjzp12GdT3cH2zQ8MQPTzTC"},{"id":4,"email":"s@mail.com","role":"security","password_digest":"$2a$10$APx54URVIzFI.Zlr2gHEDu0xQmGvuW3Suh/lbLqAtAoBXAmNZCAsG"}]



$(function() {
var thead = $("<thead />"),th;
var tbody = $("<tbody />"),tr;
  $.each(userPayload,function(key,obj) {
    th = $("<th />");
    tr = $("<tr />");
    tr.append("<td>"+obj.role+"</td>" + "<td>"+obj.email+"</td>" );
    th.append("<td>"+key+"</td>");
      
      // $.each(obj,function(_,text) {
      // });
    tr.appendTo(tbody);
  });
  tbody.appendTo("#usersTable");
});