/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strtrim.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 16:57:17 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:46:21 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char	*ft_strtrim(char const *s)
{
	char	*str;
	int		i;

	i = 0;
	if (!s)
		return (NULL);
	while ((ft_isspace(*s)) && *s)
		s++;
	while (s[i])
		i++;
	while ((ft_isspace(s[i - 1])) && i != 0)
		i--;
	if (!(str = ft_strnew(i)))
		return (NULL);
	while (i--)
		str[i] = s[i];
	return (str);
}
