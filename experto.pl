:- dynamic tiene/1.

% ------------------------
% BASE DE CONOCIMIENTO COMPLETA CON PESOS
% ------------------------
% peso(clasificacion, valor)
peso(frecuente, 5).
peso(posible,   3).
peso(raro,      1).
peso(ausente,   0).

% sintoma_enfermedad(SintomaID, Enfermedad, Clasificacion)
sintoma_enfermedad(s1, 'Gastritis', frecuente).
sintoma_enfermedad(s1, 'Úlcera Gástrica', frecuente).
sintoma_enfermedad(s1, 'ERGE', posible).
sintoma_enfermedad(s1, 'Dispepsia Funcional', frecuente).
sintoma_enfermedad(s1, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s2, 'Gastritis', frecuente).
sintoma_enfermedad(s2, 'Úlcera Gástrica', frecuente).
sintoma_enfermedad(s2, 'ERGE', posible).
sintoma_enfermedad(s2, 'Dispepsia Funcional', frecuente).
sintoma_enfermedad(s2, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s3, 'Gastritis', frecuente).
sintoma_enfermedad(s3, 'Úlcera Gástrica', raro).
sintoma_enfermedad(s3, 'ERGE', ausente).
sintoma_enfermedad(s3, 'Dispepsia Funcional', posible).
sintoma_enfermedad(s3, 'Cáncer Gástrico', posible).

sintoma_enfermedad(s4, 'Gastritis', ausente).
sintoma_enfermedad(s4, 'Úlcera Gástrica', ausente).
sintoma_enfermedad(s4, 'ERGE', frecuente).
sintoma_enfermedad(s4, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s4, 'Cáncer Gástrico', ausente).

sintoma_enfermedad(s5, 'Gastritis', ausente).
sintoma_enfermedad(s5, 'Úlcera Gástrica', ausente).
sintoma_enfermedad(s5, 'ERGE', frecuente).
sintoma_enfermedad(s5, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s5, 'Cáncer Gástrico', ausente).

sintoma_enfermedad(s6, 'Gastritis', ausente).
sintoma_enfermedad(s6, 'Úlcera Gástrica', ausente).
sintoma_enfermedad(s6, 'ERGE', frecuente).
sintoma_enfermedad(s6, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s6, 'Cáncer Gástrico', ausente).

sintoma_enfermedad(s7, 'Gastritis', posible).
sintoma_enfermedad(s7, 'Úlcera Gástrica', frecuente).
sintoma_enfermedad(s7, 'ERGE', ausente).
sintoma_enfermedad(s7, 'Dispepsia Funcional', posible).
sintoma_enfermedad(s7, 'Cáncer Gástrico', posible).

sintoma_enfermedad(s8, 'Gastritis', frecuente).
sintoma_enfermedad(s8, 'Úlcera Gástrica', posible).
sintoma_enfermedad(s8, 'ERGE', ausente).
sintoma_enfermedad(s8, 'Dispepsia Funcional', frecuente).
sintoma_enfermedad(s8, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s9, 'Gastritis', ausente).
sintoma_enfermedad(s9, 'Úlcera Gástrica', frecuente).
sintoma_enfermedad(s9, 'ERGE', ausente).
sintoma_enfermedad(s9, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s9, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s10, 'Gastritis', ausente).
sintoma_enfermedad(s10, 'Úlcera Gástrica', ausente).
sintoma_enfermedad(s10, 'ERGE', frecuente).
sintoma_enfermedad(s10, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s10, 'Cáncer Gástrico', ausente).

sintoma_enfermedad(s11, 'Gastritis', raro).
sintoma_enfermedad(s11, 'Úlcera Gástrica', posible).
sintoma_enfermedad(s11, 'ERGE', posible).
sintoma_enfermedad(s11, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s11, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s12, 'Gastritis', ausente).
sintoma_enfermedad(s12, 'Úlcera Gástrica', frecuente).
sintoma_enfermedad(s12, 'ERGE', raro).
sintoma_enfermedad(s12, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s12, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s13, 'Gastritis', ausente).
sintoma_enfermedad(s13, 'Úlcera Gástrica', ausente).
sintoma_enfermedad(s13, 'ERGE', posible).
sintoma_enfermedad(s13, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s13, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s14, 'Gastritis', frecuente).
sintoma_enfermedad(s14, 'Úlcera Gástrica', posible).
sintoma_enfermedad(s14, 'ERGE', ausente).
sintoma_enfermedad(s14, 'Dispepsia Funcional', frecuente).
sintoma_enfermedad(s14, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s15, 'Gastritis', ausente).
sintoma_enfermedad(s15, 'Úlcera Gástrica', ausente).
sintoma_enfermedad(s15, 'ERGE', posible).
sintoma_enfermedad(s15, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s15, 'Cáncer Gástrico', raro).

sintoma_enfermedad(s16, 'Gastritis', posible).
sintoma_enfermedad(s16, 'Úlcera Gástrica', posible).
sintoma_enfermedad(s16, 'ERGE', ausente).
sintoma_enfermedad(s16, 'Dispepsia Funcional', ausente).
sintoma_enfermedad(s16, 'Cáncer Gástrico', frecuente).

sintoma_enfermedad(s17, 'Gastritis', posible).
sintoma_enfermedad(s17, 'Úlcera Gástrica', posible).
sintoma_enfermedad(s17, 'ERGE', frecuente).
sintoma_enfermedad(s17, 'Dispepsia Funcional', frecuente).
sintoma_enfermedad(s17, 'Cáncer Gástrico', posible).

sintoma_enfermedad(s18, 'Gastritis', posible).
sintoma_enfermedad(s18, 'Úlcera Gástrica', posible).
sintoma_enfermedad(s18, 'ERGE', ausente).
sintoma_enfermedad(s18, 'Dispepsia Funcional', frecuente).
sintoma_enfermedad(s18, 'Cáncer Gástrico', posible).


% Etiquetas de los síntomas
sintoma(s1,  "Dolor o ardor en epigastrio").
sintoma(s2,  "Náuseas").
sintoma(s3,  "Vómitos").
sintoma(s4,  "Regurgitación ácida").
sintoma(s5,  "Pirosis (ardor retroesternal)").
sintoma(s6,  "Tos Seca").
sintoma(s7,  "Dolor que cambia con la comida").
sintoma(s8,  "Sensación de llenura precoz").
sintoma(s9,  "Hemorragia digestiva").
sintoma(s10, "Dolor torácico").
sintoma(s11, "Pérdida de peso").
sintoma(s12, "Anemia").
sintoma(s13, "Dificultad para tragar (Disfagia)").
sintoma(s14, "Saciedad precoz persistente").
sintoma(s15, "Hipo persistente").
sintoma(s16, "Malestar general/Debilidad").
sintoma(s17, "Eructos frecuentes").
sintoma(s18, "Distensión abdominal postprandial").

% ------------------------
% TEST(X): diagnóstico directo por lista de síntomas
% ------------------------

% test(ListaDeSintomas)
test(X) :-
    limpiar,
    registrar_lista(X),
    diagnosticos(X, Enfermedades),
    mostrar_resultado(Enfermedades).

% Mostrar resultado
mostrar_resultado([]) :-
    write('No se detectaron enfermedades.'), nl.

mostrar_resultado([Una]) :-
    write(Una), nl.

mostrar_resultado(Lista) :-
    atomic_list_concat(Lista, ' - ', Texto),
    write(Texto), nl,
    write('Nota: Consultar directamente con el Médico'), nl.

% Determina todas las enfermedades con puntaje maximo

diagnosticos(SintomasUsuario, EnfermedadesMaximas) :-
    findall(Enf, sintoma_enfermedad(_, Enf, _), Todas),
    sort(Todas, Enfermedades),
    findall((Enf, Puntaje),
        (member(Enf, Enfermedades),
         puntaje_total(SintomasUsuario, Enf, Puntaje)),
        Resultados),
    sort(2, @>=, Resultados, Ordenados),
    Ordenados = [( _, MejorPuntaje) | _],
    MejorPuntaje > 0,
    findall(E, member((E, MejorPuntaje), Ordenados), EnfermedadesMaximas).

% Registrar síntomas como hechos dinámicos
registrar_lista([]).
registrar_lista([H|T]) :-
    assertz(tiene(H)),
    registrar_lista(T).

% Sumar puntajes por enfermedad
puntaje_total([], _, 0).
puntaje_total([S|Resto], Enf, Total) :-
    puntaje_total(Resto, Enf, Parcial),
    (sintoma_enfermedad(S, Enf, Clasif), peso(Clasif, P) ->
        Total is Parcial + P ;
        Total = Parcial).

% Limpiar hechos temporales
limpiar :- retract(tiene(_)), fail.
limpiar.

:- initialization(main, main).

main :-
    catch(
        (
            current_input(Stream),
            read_line_to_string(Stream, Line),
            term_string(Term, Line),
            (   call(Term)
            ->  true
            ;   write('false'), nl
            )
        ),
        Error,
        (
            print_message(error, Error),
            write('false'), nl
        )
    ),
    halt.